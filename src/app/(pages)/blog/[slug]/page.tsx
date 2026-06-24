import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublishedPostBySlug, getPublishedPostSlugs } from "@/lib/blog-server";
import { articleJsonLd } from "@/lib/seo/jsonld";
import JsonLd from "@/components/JsonLd";
import BlogPostView from "./BlogPostView";

export const revalidate = 3600;

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
    const slugs = await getPublishedPostSlugs();
    return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPublishedPostBySlug(slug);

    if (!post) {
        return { title: "Post Not Found" };
    }

    const description = post.excerpt || post.content.slice(0, 160);
    const image = post.heroImage || "/og-image.jpg";

    return {
        title: post.title,
        description,
        alternates: {
            canonical: `/blog/${post.slug}`,
        },
        openGraph: {
            title: post.title,
            description,
            type: "article",
            url: `/blog/${post.slug}`,
            publishedTime: post.publishedAt || post.createdAt,
            modifiedTime: post.updatedAt,
            images: [{ url: image, alt: post.title }],
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description,
            images: [image],
        },
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = await getPublishedPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return (
        <>
            <JsonLd data={articleJsonLd(post)} />
            <BlogPostView post={post} />
        </>
    );
}
