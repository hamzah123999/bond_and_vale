import type { Metadata } from "next";

export const SERVICE_PAGES = [
    { slug: "public-relations", title: "Public Relations", path: "/services/public-relations" },
    { slug: "brand-consultancy", title: "Brand Consultancy", path: "/services/brand-consultancy" },
    { slug: "reputation-management", title: "Reputation Management", path: "/services/reputation-management" },
    { slug: "website-development", title: "Website Development", path: "/services/website-development" },
    { slug: "digital-marketing", title: "Digital Marketing", path: "/services/digital-marketing" },
    { slug: "investor-relations", title: "Investor Relations", path: "/services/investor-relations" },
] as const;

const descriptions: Record<string, string> = {
    "public-relations":
        "Strategic public relations with tier-1 media placements, editorial authority, and Bond & Vale's pay-on-success model.",
    "brand-consultancy":
        "Brand strategy, positioning, and messaging consultancy to build brands with clarity and long-term value.",
    "reputation-management":
        "Protect and strengthen brand trust with proactive reputation management and strategic communications.",
    "website-development":
        "Modern, conversion-focused website development for brands that need speed, clarity, and credibility online.",
    "digital-marketing":
        "Performance-driven digital marketing combining creative campaigns with measurable brand growth.",
    "investor-relations":
        "Clear investor communications and strategic storytelling for companies building market confidence.",
};

export function getServiceDescription(slug: keyof typeof descriptions): string {
    return descriptions[slug];
}

export function serviceMetadata(slug: keyof typeof descriptions): Metadata {
    const service = SERVICE_PAGES.find((s) => s.slug === slug)!;
    const description = descriptions[slug];

    return {
        title: service.title,
        description,
        openGraph: {
            title: `${service.title} | Bond & Vale`,
            description,
            url: service.path,
        },
        alternates: {
            canonical: service.path,
        },
    };
}
