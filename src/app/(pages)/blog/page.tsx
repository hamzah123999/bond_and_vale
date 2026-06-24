import type { Metadata } from "next";
import { getPublishedPosts } from "@/lib/blog-server";
import { blogListingJsonLd } from "@/lib/seo/jsonld";
import JsonLd from "@/components/JsonLd";
import BlogList from "./BlogList";

export const revalidate = 3600;

export const metadata: Metadata = {
    title: "Blog & News",
    description:
        "Insights on branding, public relations, and communication from Bond & Vale. Practical guidance on reputation, media, and brand growth.",
    alternates: {
        canonical: "/blog",
    },
    openGraph: {
        title: "Blog & News | Bond & Vale",
        description:
            "Insights on branding, public relations, and strategic communication from Bond & Vale.",
        url: "/blog",
    },
};

export default async function BlogPage() {
    const posts = await getPublishedPosts(50);

    return (
        <>
            <JsonLd data={blogListingJsonLd(posts)} />
            <BlogList posts={posts} />
        </>
    );
}
