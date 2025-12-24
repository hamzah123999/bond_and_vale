"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export type Media = { type: "image" | "video"; src: string; poster?: string };
export type Tab = {
    title: string;
    body: string;
    media: Media[];
    videos?: Partial<Record<0 | 1 | 2, Omit<Media, "type">>>;
};

function clamp(n: number, min: number, max: number) {
    return Math.max(min, Math.min(max, n));
}

export default function ScrollTabsSection({
    tabs,
    className = "",
    lastTabHold = 2,
    featuredIndex = 1,
    videoWhenActive = true,
    playIndexMode = "byTab",
}: {
    tabs: Tab[];
    className?: string;
    lastTabHold?: number;
    featuredIndex?: 0 | 1 | 2;
    videoWhenActive?: boolean;
    playIndexMode?: "byTab" | "featured";
}) {
    const sectionRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"],
    });

    const totalTabs = Math.max(1, tabs.length);

    const { totalWeight, cumulative } = useMemo(() => {
        const weights = tabs.map((_, i) => (i === totalTabs - 1 ? lastTabHold : 1));
        const tw = weights.reduce((a, b) => a + b, 0);

        const cum: number[] = [0];
        for (let i = 0; i < weights.length; i++) cum.push(cum[i] + weights[i] / tw);

        return { totalWeight: tw, cumulative: cum };
    }, [tabs, totalTabs, lastTabHold]);

    const activeIndexMotion = useTransform(scrollYProgress, (p) => {
        for (let i = 0; i < totalTabs; i++) {
            if (p >= cumulative[i] && p < cumulative[i + 1]) return i;
        }
        return totalTabs - 1;
    });

    const [active, setActive] = useState(0);

    useEffect(() => {
        const unsub = activeIndexMotion.on("change", (v) => setActive(v));
        return () => unsub();
    }, [activeIndexMotion]);

    const dotY = useTransform(scrollYProgress, [0, 1], ["8%", "92%"]);

    const current = tabs[clamp(active, 0, totalTabs - 1)];
    const baseMedia = (current?.media ?? []).slice(0, 3);

    const resolvedMedia = useMemo(() => {
        return baseMedia.map((m, i) => {
            const idx = i as 0 | 1 | 2;
            const v = current?.videos?.[idx];
            if (!videoWhenActive || !v) return m;
            return { type: "video" as const, src: v.src, poster: v.poster };
        });
    }, [baseMedia, current?.videos, videoWhenActive]);

    const featured = clamp(featuredIndex, 0, 2) as 0 | 1 | 2;

    const playIndex = useMemo(() => {
        if (playIndexMode === "featured") return featured;
        return clamp(active, 0, 2) as 0 | 1 | 2;
    }, [playIndexMode, featured, active]);

    const mobileMedia = resolvedMedia[playIndex];

    return (
        <section
            ref={sectionRef}
            className={["relative bg-[#e6d7c4] text-[#23352d]", className].join(" ")}
            style={{ height: `calc(100dvh * ${totalWeight})` }}
        >
            <div className="sticky top-0 min-h-[100dvh] w-full overflow-hidden">
                <div className="mx-auto h-full w-full max-w-[1400px] px-6 lg:px-14 py-12 lg:py-16">
                    <div className="relative grid h-full grid-cols-1 lg:grid-cols-[1fr_auto] gap-10">
                        <div className="flex h-full flex-col">
                            <motion.div
                                key={active}
                                initial={{ opacity: 0, y: 18 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                                className="max-w-4xl"
                            >
                                <h3 className="md:pt-16 font-[PPPangaia] uppercase leading-[0.9] tracking-wide text-[clamp(2rem,6vw,3.5rem)]">
                                    {current.title}
                                </h3>

                                <p className="mt-6 max-w-3xl text-[clamp(13px,1vw,16px)] uppercase tracking-wider text-[#23352d]/80 leading-7">
                                    {current.body}
                                </p>
                            </motion.div>

                            <div className="mt-auto pt-10">
                                {/* Mobile: show ONLY the active video/card */}
                                <div className="md:hidden">
                                    <MediaFrame featured className="h-[22rem]">
                                        <MediaContent m={mobileMedia} play />
                                    </MediaFrame>
                                </div>

                                {/* Desktop: 3 cards */}
                                <div className="hidden md:grid grid-cols-3 gap-4 lg:gap-6">
                                    {resolvedMedia.map((m, i) => (
                                        <MediaCard
                                            key={`${active}-${i}`}
                                            m={m}
                                            featured={i === featured}
                                            play={i === playIndex}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="hidden lg:flex items-center justify-center">
                            <div className="relative h-[70vh] w-[3px] rounded-full bg-black/10">
                                <motion.div
                                    style={{ top: dotY }}
                                    className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 h-3.5 w-3.5 rounded-full bg-[#e6d7c4] ring-2 ring-[#23352d]/35 shadow"
                                />
                            </div>
                        </div>

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
                    </div>
                </div>
            </div>
        </section>
    );
}

function MediaFrame({
    children,
    featured,
    className = "",
}: {
    children: React.ReactNode;
    featured?: boolean;
    className?: string;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: featured ? 1.04 : 1 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className={[
                "relative overflow-hidden border border-black/15 bg-white/10",
                "rounded-none",
                featured ? "shadow-lg ring-1 ring-[#23352d]/30" : "opacity-90",
                className,
            ].join(" ")}
        >
            {children}
            <div className="pointer-events-none absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black/10" />
        </motion.div>
    );
}

function MediaContent({ m, play }: { m?: Media; play: boolean }) {
    const vref = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        const el = vref.current;
        if (!el) return;

        if (!play) {
            el.pause();
            el.currentTime = 0;
            return;
        }

        const p = el.play();
        if (p && typeof (p as any).catch === "function") (p as any).catch(() => { });
    }, [play]);

    if (!m) return null;

    if (m.type === "video") {
        return (
            <video
                ref={vref}
                className="h-full w-full object-cover"
                src={m.src}
                poster={m.poster}
                muted
                loop
                playsInline
                preload="metadata"
            />
        );
    }

    return <img className="h-full w-full object-cover" src={m.src} alt="media" loading="lazy" />;
}

function MediaCard({ m, featured, play }: { m: Media; featured: boolean; play: boolean }) {
    return (
        <MediaFrame featured={featured} className="h-[22rem] lg:h-[26rem]">
            <MediaContent m={m} play={play} />
        </MediaFrame>
    );
}
