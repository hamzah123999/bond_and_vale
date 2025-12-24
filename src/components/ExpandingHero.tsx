"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import SplitText from "./SplitText";

export default function ExpandingHeroNoSticky({
    imageSrc,
    quote,
    className = "",
}: {
    imageSrc: string;
    quote: string;
    className?: string;
}) {
    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        // start when section enters, finish when it leaves
        offset: ["start 100%", "end 100%"],
    });

    const width = useTransform(scrollYProgress, [0, 1], ["95%", "100%"]);
    const radius = useTransform(scrollYProgress, [0, 1], [18, 0]);

    const handleAnimationComplete = () => {
        console.log('All letters have animated!');
    };

    return (
        <section ref={ref} className={["bg-[#e6d7c4] py-10 md:py-16", className].join(" ")}>
            <motion.div
                style={{ width, borderRadius: radius }}
                className="relative mx-auto overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.12)]"
            >
                <div className="relative h-[70vh] min-h-[420px] w-full">
                    <Image
                        src={imageSrc}
                        fill
                        alt="Hero"
                        className="h-full w-full object-cover"
                        loading="lazy"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-black/0" />

                    {/* Quote */}
                    <div className="pointer-events-none absolute right-[6%] top-[28%] max-w-[560px] text-right">
                        <div className="">
                            <SplitText
                                text={quote}
                                className="whitespace-pre-line font-[PPPangaia] uppercase leading-[0.95] tracking-wide text-[#0e221c]/70 text-[clamp(28px,3.6vw,64px)]"
                                delay={150}
                                duration={2}
                                splitType="lines"
                                from={{ opacity: 0, y: 100 }}
                                onLetterAnimationComplete={handleAnimationComplete}
                            />

                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
