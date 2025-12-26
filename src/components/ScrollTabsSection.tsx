"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type Item = { title: string; body: string };
type MediaItem = {
    image: { src: string; alt?: string };
    video: { src: string };
};

export default function ScrollSnapTabs() {
    const items = useMemo<Item[]>(
        () => [
            {
                title: "PAY ON SUCCESS MODEL",
                body: "OUR PAY-ON-SUCCESS MODEL REDEFINES VALUE IN COMMUNICATIONS. NO UPFRONT FEES, NO COMMITMENT AND NO RETAINERS. THIS TRANSPARENT, RESULTS-DRIVEN APPROACH REFLECTS OUR ACCOUNTABILITY, INTEGRITY, AND COMMITMENT TO MEASURABLE SUCCESS THAT STRENGTHENS EVERY PARTNERSHIP.",
            },
            {
                title: "TRANSPARENCY & TRUST",
                body: "WE OPERATE WITH TRANSPARENCY. EVERY STRATEGY, MILESTONE AND METRIC IS SHARED OPENLY. THROUGH DATA-LED COMMUNICATION AND HONEST COLLABORATION, WE BUILD THE TRUST AND CREDIBILITY THAT DEFINE LASTING CLIENT RELATIONSHIPS.",
            },
            {
                title: "NETWORK AND INFLUENCE",
                body: "WITH A GLOBAL NETWORK OF MEDIA, INVESTORS AND INDUSTRY LEADERS, WE HELP BRANDS AMPLIFY AUTHORITY AND REDEFINE INFLUENCE. OUR RELATIONSHIPS AND STRATEGIC STORYTELLING TURN REPUTATION INTO MEASURABLE VISIBILITY AND INFLUENCE THAT ENDURES.",
            },
        ],
        []
    );

    const media = useMemo<MediaItem[]>(
        () => [
            { image: { src: "/img18.jpg", alt: "Image 1" }, video: { src: "https://res.cloudinary.com/dpkp4hymz/video/upload/v1766627767/1_aazqv1.webm" } },
            { image: { src: "/img19.jpg", alt: "Image 2" }, video: { src: "https://res.cloudinary.com/dpkp4hymz/video/upload/v1766627812/3_ypaw6r.webm" } },
            { image: { src: "/img20.jpg", alt: "Image 3" }, video: { src: "https://res.cloudinary.com/dpkp4hymz/video/upload/v1766627775/2_wmylkg.webm" } },
        ],
        []
    );

    const sectionRef = useRef<HTMLElement | null>(null);
    const clipRef = useRef<HTMLDivElement | null>(null);
    const [clipW, setClipW] = useState(0);

    useEffect(() => {
        if (!clipRef.current) return;
        const el = clipRef.current;

        const ro = new ResizeObserver(() => {
            setClipW(el.getBoundingClientRect().width);
        });

        ro.observe(el);
        setClipW(el.getBoundingClientRect().width);

        return () => ro.disconnect();
    }, []);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"],
    });

    const transitions = Math.max(1, items.length - 1);

    const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const SWITCH = 0.5;

    const makeX = (i: number) =>
        useTransform(scrollYProgress, (p) => {
            const w = clipW || 0;
            const v = p * transitions;
            const t = Math.floor(v);
            const local = v - t;

            const current = t;
            const next = t + 1;

            if (i === current) {
                const tt = clamp01(local / SWITCH);
                return lerp(0, -w, tt);
            }

            if (i === next) {
                if (local < SWITCH) return -w;
                const tt = clamp01((local - SWITCH) / (1 - SWITCH));
                return lerp(-w, 0, tt);
            }

            return -w;
        });

    const makeOpacity = (i: number) =>
        useTransform(scrollYProgress, (p) => {
            const v = p * transitions;
            const t = Math.floor(v);
            const local = v - t;

            const current = t;
            const next = t + 1;

            const fadeZone = 0.18;

            if (i === current) {
                const startFade = Math.max(0, SWITCH - fadeZone);
                if (local <= startFade) return 1;
                if (local >= SWITCH) return 0;
                const tt = (local - startFade) / (SWITCH - startFade);
                return lerp(1, 0, clamp01(tt));
            }

            if (i === next) {
                const endFade = Math.min(1, SWITCH + fadeZone);
                if (local <= SWITCH) return 0;
                if (local >= endFade) return 1;
                const tt = (local - SWITCH) / (endFade - SWITCH);
                return lerp(0, 1, clamp01(tt));
            }

            return 0;
        });

    const growPresets = useMemo(() => {
        const big = 3;
        const small = 1;
        return items.map((_, activeIdx) => {
            const arr = new Array(media.length).fill(small);
            if (arr[activeIdx] != null) arr[activeIdx] = big;
            return arr;
        });
    }, [items, media.length]);

    const makeGrow = (idx: number) =>
        useTransform(scrollYProgress, (p) => {
            const v = p * transitions;
            const t = Math.floor(v);
            const local = clamp01(v - t);

            const a = Math.max(0, Math.min(items.length - 1, t));
            const b = Math.max(0, Math.min(items.length - 1, t + 1));

            const start = growPresets[a]?.[idx] ?? 1;
            const end = growPresets[b]?.[idx] ?? start;

            return lerp(start, end, local);
        });

    const makeActiveIndex = () =>
        useTransform(scrollYProgress, (p) => {
            const v = p * transitions;
            const t = Math.floor(v);
            const local = v - t;
            const active = local < SWITCH ? t : t + 1;
            return Math.max(0, Math.min(items.length - 1, active));
        });

    const activeIndex = makeActiveIndex();

    const sectionHeightVh = items.length * 100;

    return (
        <section ref={sectionRef} className="relative w-full" style={{ height: `${sectionHeightVh}vh` }}>
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <div className="relative h-full w-full flex items-center max-w-7xl mx-auto overflow-x-hidden justify-center">
                    <div ref={clipRef} className="w-full max-w-7xl px-6 md:px-10 overflow-hidden">
                        <div className="relative h-[1px] w-full" />

                        {items.map((item, idx) => {
                            const x = makeX(idx);
                            const opacity = makeOpacity(idx);

                            return (
                                <motion.div
                                    key={idx}
                                    style={{ opacity }}
                                    className="absolute left-1/2 top-[32%] w-full max-w-7xl -translate-x-1/2 -translate-y-1/2 px-6 md:px-10 pointer-events-none"
                                >
                                    <motion.div style={{ x }} className="will-change-transform">
                                        <h2 className="font-[PPPangaia] uppercase text-[#122620] md:text-6xl text-3xl tracking-wide">
                                            {item.title}
                                        </h2>
                                        <p className="md:mt-6 mt-3 max-w-5xl text-[#50594f] text-sm md:text-base md:leading-relaxed tracking-[0.08em] uppercase">
                                            {item.body}
                                        </p>
                                    </motion.div>
                                </motion.div>
                            );
                        })}

                        <div className="absolute left-1/2 top-[70%] w-full max-w-7xl -translate-x-1/2 -translate-y-1/2 px-6 md:px-10">
                            <div className="flex w-full md:gap-6 gap-2 items-stretch">
                                {media.map((m, idx) => {
                                    const flexGrow = makeGrow(idx);

                                    return (
                                        <motion.div
                                            key={idx}
                                            style={{ flexGrow, flexBasis: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="relative w-full h-[200px] md:h-[300px] lg:h-[320px] overflow-hidden">
                                                <motion.video
                                                    src={m.video.src}
                                                    muted
                                                    playsInline
                                                    loop
                                                    autoPlay
                                                    className="absolute inset-0 h-full w-full object-cover"
                                                    style={{
                                                        opacity: useTransform(activeIndex, (a) => (a === idx ? 1 : 0)),
                                                    }}
                                                />
                                                <motion.img
                                                    src={m.image.src}
                                                    alt={m.image.alt ?? ""}
                                                    draggable={false}
                                                    className="absolute inset-0 h-full w-full object-cover"
                                                    style={{
                                                        opacity: useTransform(activeIndex, (a) => (a === idx ? 0 : 1)),
                                                    }}
                                                />
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
