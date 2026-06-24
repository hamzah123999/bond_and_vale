import { getSiteUrl, SITE_NAME } from "@/lib/site";
import type { PublicBlogPost } from "@/lib/blog-server";

export function organizationJsonLd() {
    const url = getSiteUrl();
    return {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: SITE_NAME,
        url,
        logo: `${url}/bondandvale.svg`,
        sameAs: [
            "https://www.instagram.com/bondandvale",
            "https://www.linkedin.com/company/bond-vale",
            "https://www.facebook.com/share/1BS1H9f9mn/",
        ],
        description:
            "Integrated communications consultancy specializing in strategic PR, brand positioning, reputation management, and digital marketing.",
    };
}

export function serviceJsonLd(slug: string, name: string, description: string) {
    const url = getSiteUrl();
    const path = `/services/${slug}`;
    return {
        "@context": "https://schema.org",
        "@type": "Service",
        name,
        description,
        provider: {
            "@type": "Organization",
            name: SITE_NAME,
            url,
        },
        url: `${url}${path}`,
    };
}

export function articleJsonLd(post: PublicBlogPost) {
    const url = getSiteUrl();
    const pageUrl = `${url}/blog/${post.slug}`;
    return {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post.title,
        description: post.excerpt || post.title,
        image: post.heroImage ? [post.heroImage.startsWith("http") ? post.heroImage : `${url}${post.heroImage}`] : undefined,
        datePublished: post.publishedAt || post.createdAt,
        dateModified: post.updatedAt,
        author: {
            "@type": "Organization",
            name: SITE_NAME,
        },
        publisher: {
            "@type": "Organization",
            name: SITE_NAME,
            logo: {
                "@type": "ImageObject",
                url: `${url}/bondandvale.svg`,
            },
        },
        mainEntityOfPage: pageUrl,
        url: pageUrl,
        articleSection: post.category,
    };
}

export function blogListingJsonLd(posts: PublicBlogPost[]) {
    const url = getSiteUrl();
    return {
        "@context": "https://schema.org",
        "@type": "Blog",
        name: `${SITE_NAME} Blog`,
        url: `${url}/blog`,
        blogPost: posts.slice(0, 10).map((post) => ({
            "@type": "BlogPosting",
            headline: post.title,
            url: `${url}/blog/${post.slug}`,
            datePublished: post.publishedAt || post.createdAt,
        })),
    };
}
