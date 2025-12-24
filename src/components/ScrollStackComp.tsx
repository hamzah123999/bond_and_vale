"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import ScrollStack, { ScrollStackItem } from "./ScrollStack";

type Item = {
    title: string;
    body: string;
    image: string;
};

export default function ScrollStackComp() {
    const items: Item[] = useMemo(
        () => [
            {
                title: "Pay on success model",
                body:
                    "Our pay-on-success model redefines value in communications. No upfront fees, No commitment and no retainers. This transparent, results-driven approach reflects our accountability, integrity, and commitment to measurable success that strengthens every partnership.",
                image:
                    "/img2.jpg",
            },
            {
                title: "Transparency & trust",
                body:
                    "We operate with transparency. Every strategy, milestone and metric is shared openly. Through data-led communication and honest collaboration, we build the trust and credibility that define lasting client relationships and meaningful business outcomes",
                image:
                    "/img2.jpg",
            },
            {
                title: "Network and influence",
                body:
                    "With a global network of media, investors and industry leaders, we help brands amplify authority and redefine influence. Our relationships and strategic storytelling turn reputation into measurable visibility and influence that endures long after the headlines fade",
                image:
                    "/img2.jpg",
            },
        ],
        []
    );

    const [active, setActive] = useState(0);

    return (
        <section className="bg-[#e6d7c4] text-[#23352d]">
            {/* GRID: left stack + right sticky image */}
            <div className="mx-auto max-w-[1450px] px-4 md:px-10 lg:px-14 py-14 lg:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
                    {/* LEFT: Your existing ScrollStack */}
                    <div className="order-2 lg:order-1">
                        <ScrollStack
                            className="h-[70vh] lg:h-[78vh] overflow-hidden"
                            itemDistance={140}
                            itemStackDistance={34}
                            baseScale={0.9}
                            itemScale={0.035}
                            blurAmount={1.4}
                            rotationAmount={0}
                            stackPosition="18%"
                            scaleEndPosition="8%"
                            // optional now (after fix)
                            onStackComplete={() => { }}
                        >
                            {items.map((it, idx) => (
                                <ScrollStackItem key={it.title}>
                                    {/* IMPORTANT:
                      This div gives each card a "premium" design
                   */}
                                    <div
                                        className="relative border border-black/10 bg-[#e6d7c4] px-7 py-7 md:px-9 md:py-9 shadow-[0_18px_60px_rgba(0,0,0,0.09)]"
                                        onMouseEnter={() => setActive(idx)}
                                        onFocus={() => setActive(idx)}
                                        tabIndex={0}
                                        role="button"
                                        aria-label={it.title}
                                    >
                                        <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-[#23352d]/55">
                                            <span>Bond & Value</span>
                                            <span>{String(idx + 1).padStart(2, "0")}</span>
                                        </div>

                                        <h3 className="mt-5 font-[PPPangaia] uppercase tracking-wide leading-[0.95] text-[clamp(1.8rem,3.2vw,3.4rem)]">
                                            {it.title}
                                        </h3>

                                        <p className="mt-4 max-w-xl text-[#23352d]/75 leading-7 text-[clamp(0.95rem,1.05vw,1.05rem)]">
                                            {it.body}
                                        </p>

                                        <div className="mt-7 h-px w-full bg-black/10" />

                                        <div className="mt-4 text-xs uppercase tracking-[0.25em] text-[#23352d]/55">
                                            Scroll to continue
                                        </div>
                                    </div>
                                </ScrollStackItem>
                            ))}
                        </ScrollStack>
                    </div>

                    {/* RIGHT: Sticky Image (changes when card active) */}
                    <div className="order-1 lg:order-2 lg:sticky lg:top-20">
                        <div className="relative overflow-hidden border border-black/10 bg-white/10 h-[52vh] md:h-[62vh] lg:h-[78vh]">
                            {/* Crossfade images */}
                            {items.map((it, idx) => (
                                <div
                                    key={it.image}
                                    className={[
                                        "absolute inset-0 transition-opacity duration-700",
                                        idx === active ? "opacity-100" : "opacity-0",
                                    ].join(" ")}
                                >
                                    <Image
                                        src={it.image}
                                        alt={it.title}
                                        fill
                                        className="object-cover"
                                        sizes="(min-width: 1024px) 50vw, 100vw"
                                        priority={idx === 0}
                                    />
                                </div>
                            ))}

                            {/* Soft overlay */}
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10" />

                            {/* Small caption */}
                            <div className="absolute bottom-5 left-5 right-5">
                                <div className="inline-flex max-w-full items-center gap-3 bg-[#e6d7c4]/80 px-4 py-2 backdrop-blur-sm border border-black/10">
                                    <div className="h-2 w-2 rounded-full bg-[#23352d]/70" />
                                    <p className="truncate text-xs uppercase tracking-[0.25em] text-[#23352d]/75">
                                        {items[active]?.title}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Mobile helper */}
                        <p className="mt-4 lg:hidden text-xs uppercase tracking-[0.25em] text-[#23352d]/55">
                            Tap a card to change image
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
