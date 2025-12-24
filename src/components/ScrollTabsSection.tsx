"use client";

import React, { useMemo, useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type Media = {
    type: "image" | "video";
    src: string;
    poster?: string; // for video
};

type Tab = {
    title: string;
    body: string;
    media: Media[]; // 3 items
};

function clamp(n: number, min: number, max: number) {
    return Math.max(min, Math.min(max, n));
}

export default function ScrollTabsSection({
    tabs,
    className = "",
}: {
    tabs: Tab[];
    className?: string;
}) {
    const sectionRef = useRef<HTMLDivElement>(null);

    // section scroll progress 0..1 across full section height
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"],
    });

    const total = Math.max(1, tabs.length);
    // map progress -> active index (0..tabs-1)
    const activeIndexMotion = useTransform(scrollYProgress, (p) =>
        clamp(Math.round(p * (total - 1)), 0, total - 1)
    );

    const [active, setActive] = useState(0);

    useEffect(() => {
        const unsub = activeIndexMotion.on("change", (v) => setActive(v));
        return () => unsub();
    }, [activeIndexMotion]);

    // dot position along the right rail
    const dotY = useTransform(scrollYProgress, [0, 1], ["8%", "92%"]);

    const current = tabs[active];

    return (
        <section
            ref={sectionRef}
            className={[
                "relative bg-[#e6d7c4] text-[#23352d]",
                // make it “scroll-driven”: each tab roughly gets one viewport
                "h-[calc(100dvh*3)] md:h-[calc(100dvh*3.2)]", // adjust if tabs length differs
                className,
            ].join(" ")}
        >
            {/* sticky viewport */}
            <div className="sticky top-0 min-h-[100dvh] w-full overflow-hidden">
                <div className="mx-auto h-full w-full max-w-[1400px] px-6 lg:px-14 py-12 lg:py-16">
                    <div className="relative grid h-full grid-cols-1 lg:grid-cols-[1fr_auto] gap-10">
                        {/* LEFT CONTENT */}
                        <div className="flex h-full flex-col">
                            {/* animated text block */}
                            <motion.div
                                key={active}
                                initial={{ opacity: 0, y: 18 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                                className="max-w-4xl"
                            >
                                <h3 className="font-serif leading-[0.9] tracking-wide text-[clamp(44px,6vw,90px)]">
                                    {current.title}
                                </h3>

                                <p className="mt-6 max-w-3xl text-[clamp(13px,1vw,16px)] uppercase tracking-wider text-[#23352d]/80 leading-7">
                                    {current.body}
                                </p>
                            </motion.div>

                            {/* MEDIA GRID */}
                            <div className="mt-auto pt-10">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
                                    {current.media.map((m, i) => (
                                        <motion.div
                                            key={`${active}-${i}`}
                                            initial={{ opacity: 0, y: 14, scale: 0.98 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            transition={{
                                                duration: 0.55,
                                                delay: 0.05 + i * 0.06,
                                                ease: [0.22, 1, 0.36, 1],
                                            }}
                                            className={`relative overflow-hidden border border-black/15 bg-white/10 ${i === 0 ? "h-80"
                                                : i === 1 ? "h-96"
                                                    : "h-[28rem]"}`}
                                        >
                                            {m.type === "video" ? (
                                                <video
                                                    className="h-full w-full object-cover"
                                                    src={m.src}
                                                    poster={m.poster}
                                                    autoPlay
                                                    muted
                                                    loop
                                                    playsInline
                                                    preload="metadata"
                                                />
                                            ) : (
                                                <img
                                                    className="h-full w-full object-cover"
                                                    src={m.src}
                                                    alt="media"
                                                    loading="lazy"
                                                />
                                            )}

                                            {/* subtle hover */}
                                            <div className="pointer-events-none absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black/10" />
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* RIGHT SCROLL INDICATOR */}
                        <div className="hidden lg:flex items-center justify-center">
                            <div className="relative h-[70vh] w-[3px] rounded-full bg-black/10">
                                <motion.div
                                    style={{ top: dotY }}
                                    className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 h-3.5 w-3.5 rounded-full bg-[#e6d7c4] ring-2 ring-[#23352d]/35 shadow"
                                />
                            </div>
                        </div>

                        {/* small “tab labels” (optional) */}
                        <div className="hidden lg:block absolute right-10 top-10">
                            <div className="flex flex-col gap-3 text-xs uppercase tracking-widest text-[#23352d]/60">
                                {tabs.map((t, idx) => (
                                    <div
                                        key={t.title}
                                        className={[
                                            "transition-opacity",
                                            idx === active ? "opacity-100 text-[#23352d]" : "opacity-60",
                                        ].join(" ")}
                                    >
                                        {String(idx + 1).padStart(2, "0")}
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* end */}
                    </div>
                </div>
            </div>
        </section>
    );
}
