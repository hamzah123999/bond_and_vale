import { DBconnection } from "@/lib/db";
import BlogPost from "@/model/BlogPost";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    await DBconnection();

    try {
        const { searchParams } = new URL(request.url);
        const status = (searchParams.get("status") || "published").toLowerCase();
        const limit = Number(searchParams.get("limit") || "50");
        const page = Number(searchParams.get("page") || "1");
        const skip = Math.max(0, (page - 1) * limit);

        const filter: any = {};
        if (status === "draft" || status === "published") filter.status = status;
        // status=all -> no filter

        const posts = await BlogPost.find(filter)
            .sort({ publishedAt: -1, createdAt: -1 })
            .skip(skip)
            .limit(Math.min(limit, 200))
            .lean();

        const total = await BlogPost.countDocuments(filter);

        return NextResponse.json(
            {
                success: true,
                posts,
                pagination: {
                    page,
                    limit: Math.min(limit, 200),
                    total,
                    totalPages: Math.ceil(total / Math.min(limit, 200)),
                },
            },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json(
            {
                success: false,
                message: "Failed to fetch blog posts",
                error: error?.message || "Unknown error",
            },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    await DBconnection();

    try {
        const body = await request.json();

        const {
            title,
            slug,
            category,
            excerpt,
            heroImage,
            readTime,
            content,
            status, // "draft" | "published"
            publishedAt,
        } = body;

        if (!title || !slug || !category || !content) {
            return NextResponse.json(
                {
                    success: false,
                    message: "title, slug, category, and content are required",
                },
                { status: 400 }
            );
        }

        const safeStatus =
            status && ["draft", "published"].includes(status) ? status : "draft";

        const created = await BlogPost.create({
            title,
            slug,
            category,
            excerpt: excerpt ?? "",
            heroImage: heroImage ?? "",
            readTime: readTime ?? "",
            content,
            status: safeStatus,
            // You can pass publishedAt manually, otherwise model can auto set when status becomes published
            publishedAt: publishedAt ?? null,
        });

        return NextResponse.json(
            { success: true, message: "Blog post created", post: created },
            { status: 201 }
        );
    } catch (error: any) {
        // Duplicate slug error (Mongo)
        if (error?.code === 11000) {
            return NextResponse.json(
                { success: false, message: "Slug already exists. Use a unique slug." },
                { status: 409 }
            );
        }

        return NextResponse.json(
            {
                success: false,
                message: "Failed to create blog post",
                error: error?.message || "Unknown error",
            },
            { status: 500 }
        );
    }
}
