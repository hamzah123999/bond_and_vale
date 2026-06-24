import dynamic from "next/dynamic";
import Wrapper from "@/app/Wrapper";
import HeroClient from "@/components/HeroClient";
import DoorRevealSectionComp from "@/components/DoorRevealSectionComp";
import ShufflingCards from "@/components/ShufflingCards";
import JsonLd from "@/components/JsonLd";
import { getPublishedPosts } from "@/lib/blog-server";
import { organizationJsonLd } from "@/lib/seo/jsonld";
import { SERVICE_CARDS } from "@/lib/media/service-videos";

const ScrollTabsSectionComp = dynamic(
    () => import("@/components/ScrollTabsSectionComp"),
    { loading: () => <div className="h-[150vh]" aria-hidden /> }
);

const ProjectsFeatureSection = dynamic(
    () => import("@/components/ProjectsFeatureSection"),
    { loading: () => <div className="h-96" aria-hidden /> }
);

const FlowingMenuComp = dynamic(
    () => import("@/components/FlowingMenuComp"),
    { loading: () => <div className="h-24" aria-hidden /> }
);

const ServicesSection = dynamic(
    () => import("@/components/ServicesSection"),
    { loading: () => <div className="h-96" aria-hidden /> }
);

const ExpandingHero = dynamic(
    () => import("@/components/ExpandingHero"),
    { loading: () => <div className="h-[70vh]" aria-hidden /> }
);

const TestimonialsSlider = dynamic(
    () => import("@/components/TestimonialsSlider"),
    { loading: () => <div className="h-96" aria-hidden /> }
);

const BlogSection = dynamic(
    () => import("@/components/BlogSection"),
    { loading: () => <div className="h-64" aria-hidden /> }
);

export default async function HomePage() {
    const recentPosts = await getPublishedPosts(3);

    return (
        <>
            <JsonLd data={organizationJsonLd()} />
            <Wrapper>
                <div className="bg-[#e0d1be] min-h-screen">
                    <HeroClient />

                    <DoorRevealSectionComp />

                    <ShufflingCards />

                    <div>
                        <ScrollTabsSectionComp />
                    </div>

                    <ProjectsFeatureSection
                        leftImage="/img17.png"
                        rightTopImage="/img3.png"
                        title={"Strategic PR & Marketing for Exceptional Brand Growth"}
                        body="We’re not a firm that simply accepts change as inevitable — we embrace it. We shape the narrative, putting you firmly in control. This evolution of our identity makes that clear. It’s more than a new look or rebrand; it’s a declaration of who we are and what we stand for. A commitment to move forward — always — alongside our clients.
We are Bond and Vale. Redefining Influence."
                        buttonHref="/services"
                        buttonLabel="Services"
                    />

                    <div className="py-10 bg-[#e6d7c4]">
                        <FlowingMenuComp />
                    </div>

                    <ServicesSection services={SERVICE_CARDS} />

                    <ExpandingHero
                        imageSrc="/bg.webp"
                        quote='"We shape brands with clarity,
strategy, and long-term value."'
                    />

                    <div className="overflow-x-hidden">
                        <TestimonialsSlider />
                    </div>

                    <BlogSection
                        intro="Discover the latest trends, tips, and inspiration. Stay up-to-date on our latest projects and insights."
                        posts={recentPosts}
                    />
                </div>
            </Wrapper>
        </>
    );
}
