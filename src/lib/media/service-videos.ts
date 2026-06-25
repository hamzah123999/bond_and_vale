import { cloudinaryVideo, VIDEO_WIDTH } from "@/lib/cloudinary";

export const SERVICE_VIDEO_URLS = {
    "public-relations":
        "https://res.cloudinary.com/dpkp4hymz/video/upload/v1769567969/Video_Public_Relations_pw3b0q.mp4",
    "brand-consultancy":
        "https://res.cloudinary.com/dpkp4hymz/video/upload/v1769568016/Video_Brand_Consultancy_Fix_hmd5d0.mp4",
    "reputation-management":
        "https://res.cloudinary.com/dpkp4hymz/video/upload/v1769567960/Video_Reputation_Management_evuc5j.mp4",
    "website-development":
        "https://res.cloudinary.com/dpkp4hymz/video/upload/v1769567951/Video_Website_Development_p0yssr.mp4",
    "digital-marketing":
        "https://res.cloudinary.com/dpkp4hymz/video/upload/v1769568007/Video_Digital_Marketing_b4te6a.mp4",
    "investor-relations":
        "https://res.cloudinary.com/dpkp4hymz/video/upload/v1769567979/Video_Investor_Relations_wffyxy.mp4",
} as const;

export type ServiceSlug = keyof typeof SERVICE_VIDEO_URLS;

export const HERO_BACKGROUND_VIDEOS = {
    desktop:
        "https://res.cloudinary.com/dpkp4hymz/video/upload/v1768445682/videobg_d0ta23_1_goxitj.mp4",
    mobile:
        "https://res.cloudinary.com/dpkp4hymz/video/upload/v1768445684/mobile_ttipba_1_b0fiko.mp4",
} as const;

export const SCROLL_TAB_VIDEOS = [
    "https://res.cloudinary.com/dpkp4hymz/video/upload/v1766627767/1_aazqv1.webm",
    "https://res.cloudinary.com/dpkp4hymz/video/upload/v1766627812/3_ypaw6r.webm",
    "https://res.cloudinary.com/dpkp4hymz/video/upload/v1766627775/2_wmylkg.webm",
] as const;

type VideoSize = keyof typeof VIDEO_WIDTH;

export function serviceVideoUrl(slug: ServiceSlug, size: VideoSize = "hero"): string {
    return cloudinaryVideo(SERVICE_VIDEO_URLS[slug], { width: VIDEO_WIDTH[size] });
}

export const SERVICE_CARDS = [
    {
        slug: "public-relations" as const,
        title: "Public Relations",
        imageSrc: "/services/PublicRelations.webp",
        tag: "Service",
        description: "Media outreach & brand positioning.",
    },
    {
        slug: "brand-consultancy" as const,
        title: "Brand Consultancy",
        imageSrc: "/services/BrandConsultancy.webp",
        tag: "Service",
        description: "Identity, strategy & messaging.",
    },
    {
        slug: "reputation-management" as const,
        title: "Reputation Management",
        imageSrc: "/services/ReputationManagement.webp",
        tag: "Service",
        description: "Protect and strengthen trust.",
    },
    {
        slug: "website-development" as const,
        title: "Website Development",
        imageSrc: "/services/WebsiteDevelopment.webp",
        tag: "Service",
        description: "Modern, fast conversion websites.",
    },
    {
        slug: "digital-marketing" as const,
        title: "Digital Marketing",
        imageSrc: "/services/DigitalMarketing.webp",
        tag: "Service",
        description: "Performance + creative campaigns.",
    },
    {
        slug: "investor-relations" as const,
        title: "Investor Relations",
        imageSrc: "/services/InvestorRelations.webp",
        tag: "Service",
        description: "Clear communication for investors.",
    },
].map((service) => ({
    ...service,
    href: service.slug,
    videoSrc: serviceVideoUrl(service.slug, "card"),
}));
