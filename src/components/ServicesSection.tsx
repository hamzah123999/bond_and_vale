"use client";

import ServiceCard from "@/components/ServiceCard";
import SplitText from "./SplitText";

type Service = {
    title: string;
    imageSrc: string;
    videoSrc: string;
    tag?: string;
    description?: string;
    href?: string;
};

export default function ServicesSection({
    headingTop = "Your Solutions,",
    headingBottom = "All in One Place",
    sub1 = "Covering all your communication needs.",
    sub2 = "Find out about our full range of services we offer.",
    services,
}: {
    headingTop?: string;
    headingBottom?: string;
    sub1?: string;
    sub2?: string;
    services: Service[];
}) {

    const handleAnimationComplete = () => {
        console.log('All letters have animated!');
    };
    return (
        <section className="bg-[#e6d7c4] text-[#23352d]">
            <div className="mx-auto max-w-[1450px] px-4 lg:px-14 py-14 lg:py-20">
                {/* Heading */}
                <div className="flex flex-col ">
                    <h2 className="">
                        <SplitText
                            text={headingTop}
                            className="font-[PPPangaia]  uppercase md:leading-[1] leading-[1.3] tracking-wide text-[clamp(2rem,6vw,5rem)]"
                            delay={150}
                            duration={2}
                            splitType="lines"
                            from={{ opacity: 0, y: 100 }}
                            onLetterAnimationComplete={handleAnimationComplete}
                        />
                        <SplitText
                            text={headingBottom}
                            className="font-[PPPangaia] md:block md:pl-60 uppercase md:leading-[1] leading-[1.3] tracking-wide text-[clamp(2rem,6vw,5rem)]"
                            delay={150}
                            duration={2}
                            splitType="lines"
                            from={{ opacity: 0, y: 100 }}
                            onLetterAnimationComplete={handleAnimationComplete}
                        />
                    </h2>

                    <div data-aos="fade-up"
                        className="mt-6 max-w-xl  text-[#23352d]/65 text-sm uppercase tracking-widest leading-6">
                        <div>{sub1}</div>
                        <div>{sub2}</div>
                    </div>
                </div>

                {/* Cards */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {services.map((s) => (
                        <ServiceCard
                            key={s.title}
                            
                            href={s.href || "/services"}
                            title={s.title}
                            tag={s.tag || "Service"}
                            description={s.description || "Explore this service."}
                            imageSrc={s.imageSrc}
                            videoSrc={s.videoSrc}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
