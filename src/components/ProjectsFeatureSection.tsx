"use client";

import Image from "next/image";
import TicketButton from "@/components/TicketButton";
import { ParallaxImage } from "./ParallaxImage";
import SplitText from "./SplitText";

type ProjectsFeatureProps = {
    leftImage: string;
    rightTopImage: string;
    eyebrow?: string;
    title: string;
    body: string;
    buttonHref: string;
    buttonLabel: string;
};

export default function ProjectsFeatureSection({
    leftImage,
    rightTopImage,
    eyebrow = "SERVICES",
    title,
    body,
    buttonHref,
    buttonLabel,
}: ProjectsFeatureProps) {

    const handleAnimationComplete = () => {
        console.log('All letters have animated!');
    };
    return (
        <section className="bg-[#e6d7c4] text-[#0e221c]">
            <div className="mx-auto w-full max-w-[1450px] px-4 sm:px-6 lg:px-14 py-10 sm:py-14 lg:py-20">
                <div className="hidden lg:grid grid-cols-[0.85fr_1.15fr] gap-12 items-stretch">
                    {/* LEFT BIG IMAGE */}
                    <div className="relative overflow-hidden">
                        <div className="relative aspect-[4/3] w-full ">
                            <ParallaxImage
                                src={leftImage}
                                alt="Project image"
                                className="object-cover"
                            />
                        </div>
                    </div>

                    {/* RIGHT CONTENT */}
                    <div className="relative flex flex-col">
                        {/* top small image */}
                        <div className="flex justify-end">
                            <div className="relative  w-[min(420px,32vw)] aspect-[16/9] overflow-hidden">
                                <ParallaxImage
                                    src={rightTopImage}
                                    alt="Project preview"
                                    className="object-cover"
                                />
                            </div>
                        </div>

                        {/* centered content area */}
                        <div className="mt-10 flex-1 grid grid-cols-[1fr_1fr] gap-10 items-center">
                            {/* big title (center-ish) */}
                            <div className="pr-4">
                                <div className="mb-6  font-serif tracking-widest text-[#0e221c]/70">
                                    {eyebrow}
                                </div>

                                <h2 className="">
                                    <SplitText
                                        text={title}
                                        className="font-[PPPangaia] !text-start uppercase leading-[1] md:leading-[1.2] tracking-wide text-[#0e221c] text-[clamp(2rem,4.2vw,2.7rem)]"
                                        delay={150}
                                        duration={2}
                                        splitType="lines"
                                        from={{ opacity: 0, y: 100 }}
                                        onLetterAnimationComplete={handleAnimationComplete}
                                    />
                                </h2>
                            </div>

                            {/* paragraph + button */}
                            <div className="pl-2" data-aos="fade-up"
>
                                <p className="text-[#0e221c]/80 text-sm">
                                    {body}
                                </p>

                                <div className="mt-7">
                                    <TicketButton
                                        href={buttonHref}
                                        label={buttonLabel}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile / Tablet layout */}
                <div className="lg:hidden space-y-8">
                    <div className="relative aspect-[4/3] w-full overflow-hidden">
                        <Image
                            src={leftImage}
                            alt="Project image"
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="pointer-events-none absolute inset-0 bg-black/5" />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="font-serif tracking-widest text-[#0e221c]/70">
                            {eyebrow}
                        </div>

                        <div className="relative w-[46%] aspect-[16/9] overflow-hidden">
                            <Image
                                src={rightTopImage}
                                alt="Project preview"
                                fill
                                className="object-cover"
                            />
                            <div className="pointer-events-none absolute inset-0 bg-black/5" />
                        </div>
                    </div>

                    <div className="">

                        <h2 className="font-[PPPangaia] mb-4 uppercase leading-[1.2] tracking-wide text-[#0e221c] text-[clamp(34px,9vw,54px)]">
                            {title}
                        </h2>

                        <p className="text-[#0e221c] text-[15px]">
                            {body}
                        </p>
                    </div>

                    <TicketButton
                        href={buttonHref}
                        label={buttonLabel}
                    />
                </div>
            </div>
        </section>
    );
}
