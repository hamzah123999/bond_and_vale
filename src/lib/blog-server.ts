import BlogPost from "@/model/BlogPost";
import { connectDBSafe } from "@/lib/db-server";

export type PublicBlogPost = {
    _id: string;
    title: string;
    slug: string;
    category: string;
    excerpt: string;
    heroImage: string;
    readTime: string;
    content: string;
    publishedAt: string | null;
    createdAt: string;
    updatedAt: string;
};

function serialize(doc: Record<string, unknown>): PublicBlogPost {
    return {
        _id: String(doc._id),
        title: String(doc.title ?? ""),
        slug: String(doc.slug ?? ""),
        category: String(doc.category ?? ""),
        excerpt: String(doc.excerpt ?? ""),
        heroImage: String(doc.heroImage ?? ""),
        readTime: String(doc.readTime ?? ""),
        content: String(doc.content ?? ""),
        publishedAt: doc.publishedAt ? new Date(doc.publishedAt as string).toISOString() : null,
        createdAt: new Date(doc.createdAt as string).toISOString(),
        updatedAt: new Date(doc.updatedAt as string).toISOString(),
    };
}

export async function getPublishedPosts(limit = 50): Promise<PublicBlogPost[]> {
    const connected = await connectDBSafe();
    if (!connected) return [];

    const posts = await BlogPost.find({ status: "published" })
        .sort({ publishedAt: -1, createdAt: -1 })
        .limit(limit)
        .lean();

    return posts.map((p) => serialize(p as Record<string, unknown>));
}

export async function getPublishedPostBySlug(slug: string): Promise<PublicBlogPost | null> {
    const connected = await connectDBSafe();
    if (!connected) return null;

    const post = await BlogPost.findOne({ slug, status: "published" }).lean();
    if (!post) return null;

    return serialize(post as Record<string, unknown>);
}

export async function getPublishedPostSlugs(): Promise<string[]> {
    const connected = await connectDBSafe();
    if (!connected) return [];

    const posts = await BlogPost.find({ status: "published" }).select("slug").lean();
    return posts.map((p) => String(p.slug));
}
