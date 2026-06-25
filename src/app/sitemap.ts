import type { MetadataRoute } from "next";
import { getPublishedPostSlugs } from "@/lib/blog-server";
import { SERVICE_PAGES } from "@/lib/seo/services";
import { getSiteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const base = getSiteUrl();
    const now = new Date();

    const staticRoutes: MetadataRoute.Sitemap = [
        "",
        "/contact",
        "/services",
        "/blog",
        "/privacy-policy",
        "/terms-and-conditions",
    ].map((path) => ({
        url: `${base}${path}`,
        lastModified: now,
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1 : 0.8,
    }));

    const serviceRoutes: MetadataRoute.Sitemap = SERVICE_PAGES.map((service) => ({
        url: `${base}${service.path}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.85,
    }));

    let blogRoutes: MetadataRoute.Sitemap = [];
    try {
        const slugs = await getPublishedPostSlugs();
        blogRoutes = slugs.map((slug) => ({
            url: `${base}/blog/${slug}`,
            lastModified: now,
            changeFrequency: "weekly" as const,
            priority: 0.7,
        }));
    } catch {
        blogRoutes = [];
    }

    return [...staticRoutes, ...serviceRoutes, ...blogRoutes];
}
