import { DBconnection } from "@/lib/db";
import BlogPost from "@/model/BlogPost";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    _request: NextRequest,
    context: { params: Promise<{ slug: string }> }
) {
    await DBconnection();

    try {
        const { slug } = await context.params;

        const post = await BlogPost.findOne({ slug }).lean();

        if (!post) {
            return NextResponse.json(
                { success: false, message: "Blog post not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, post }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            {
                success: false,
                message: "Failed to fetch blog post",
                error: error?.message || "Unknown error",
            },
            { status: 500 }
        );
    }
}

export async function PATCH(
    request: NextRequest,
    context: { params: Promise<{ slug: string }> }
) {
    await DBconnection();

    try {
        const { slug } = await context.params;
        const body = await request.json().catch(() => ({}));

        const allowedFields = [
            "title",
            "category",
            "excerpt",
            "heroImage",
            "readTime",
            "content",
            "status",
            "publishedAt",
            "slug", // allow changing slug if you want (optional)
        ] as const;

        const update: any = {};
        for (const key of allowedFields) {
            if (key in body) update[key] = body[key];
        }

        // sanitize status
        if ("status" in update) {
            update.status = ["draft", "published"].includes(update.status)
                ? update.status
                : undefined;
            if (update.status === undefined) delete update.status;
        }

        // If status switched to published and publishedAt not provided, set it
        if (update.status === "published" && !("publishedAt" in update)) {
            update.publishedAt = new Date();
        }

        const updated = await BlogPost.findOneAndUpdate({ slug }, update, {
            new: true,
        });

        if (!updated) {
            return NextResponse.json(
                { success: false, message: "Blog post not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, message: "Blog post updated", post: updated },
            { status: 200 }
        );
    } catch (error: any) {
        if (error?.code === 11000) {
            return NextResponse.json(
                { success: false, message: "Slug already exists. Use a unique slug." },
                { status: 409 }
            );
        }

        return NextResponse.json(
            {
                success: false,
                message: "Failed to update blog post",
                error: error?.message || "Unknown error",
            },
            { status: 500 }
        );
    }
}

export async function DELETE(
    _request: NextRequest,
    context: { params: Promise<{ slug: string }> }
) {
    await DBconnection();

    try {
        const { slug } = await context.params;

        const deleted = await BlogPost.findOneAndDelete({ slug });

        if (!deleted) {
            return NextResponse.json(
                { success: false, message: "Blog post not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, message: "Blog post deleted" },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json(
            {
                success: false,
                message: "Failed to delete blog post",
                error: error?.message || "Unknown error",
            },
            { status: 500 }
        );
    }
}
