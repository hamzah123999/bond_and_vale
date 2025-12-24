"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Wrapper from "@/app/Wrapper";
import Header from "@/components/Header";
import TabLoader from "@/components/Loader";

type Props = {
    title?: string;
    subtitle?: string;
    tags?: string[];
    stats?: { label: string; value: string }[];
    heroMedia?: {
        image1: string;
        image2: string;
        video: string;
        videoPoster?: string;
    };
};

export default function ServiceDetailPage({
    title = "Website Development",
    subtitle =
    "Narrative-led design. Conversion-intelligent builds. Performance that feels effortless.",
    tags = [
        "Web Design",
        "UX/UI",
        "Site Architecture",
        "Copywriting",
        "Speed Optimization",
    ],
    stats = [
        { label: "Sites Built", value: "100+" },
        { label: "Avg Performance", value: "93%" },
        { label: "Built For", value: "Scale" },
    ],
    heroMedia = {
        image1: "img14.png",
        image2: "img6.jpg",
        video:
            "/video4.mp4",
        videoPoster: "img6.jpg",
    },
}: Props) {
    const deliverables = [
        "Web Design",
        "UX/UI",
        "Web Development",
        "Site Architecture",
        "Copywriting",
        "Speed Optimization",
    ];

    const process = [
        {
            title: "Discovery",
            body: "Understand goals, brand narrative, and audiences.",
        },
        {
            title: "Strategy & UX",
            body: "Define structure and storytelling.",
        },
        {
            title: "Design",
            body: "Craft visual + interaction systems.",
        },
        {
            title: "Development",
            body: "Engineer for performance, security, and scale.",
        },
        {
            title: "Launch",
            body: "Test, refine, and deploy.",
        },
        {
            title: "Support",
            body: "Evolve with your business.",
        },
    ];

    return (
        <Wrapper>
            <TabLoader direction="top" speed={1.4} minDuration={2000} />
            <main className="bg-[#e6d7c4] text-[#23352d]">
                <Header />

                {/* Top spacing */}
                <div className="mx-auto max-w-[1450px] px-4 lg:px-14 pt-14 lg:pt-20 pb-10 lg:pb-14">
                    {/* Breadcrumb */}
                    <div className="text-xs uppercase tracking-[0.22em] text-[#23352d]/60">
                        <Link href="/services" className="hover:text-[#23352d]">
                            Services
                        </Link>
                        <span className="mx-2">/</span>
                        <span className="text-[#23352d]">{title}</span>
                    </div>

                    {/* Title Row */}
                    <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1.25fr_0.75fr] gap-10 items-start">
                        <div>
                            <h1 className="font-[PPPangaia] uppercase leading-[0.92] tracking-wide text-[clamp(2.5rem,5.7vw,4rem)]">
                                {title}
                            </h1>
                            <p className="mt-5 max-w-2xl text-[#23352d]/75 leading-7">
                                {subtitle}
                            </p>

                            {/* Tags */}
                            <div className="mt-6 flex flex-wrap gap-2">
                                {tags.map((t) => (
                                    <span
                                        key={t}
                                        className="rounded-full border border-black/10 bg-white/15 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-[#23352d]/75"
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="lg:justify-self-end w-full max-w-md">
                            <div className="grid md:grid-cols-3 grid-cols-1 md:gap-3 gap-2">
                                {stats.map((s) => (
                                    <div
                                        key={s.label}
                                        className="border border-black/10 bg-white/10 px-4 py-4"
                                    >
                                        <div className="font-serif text-2xl leading-none">
                                            {s.value}
                                        </div>
                                        <div className="mt-2 text-[10px] uppercase tracking-[0.22em] text-[#23352d]/60">
                                            {s.label}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 flex items-center gap-3">
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center gap-3 rounded-full border border-black/15 bg-[#3f4b3f] px-5 py-3 text-sm text-[#e6d7c4] hover:opacity-90 transition"
                                >
                                    Start a Project <ArrowRight className="h-4 w-4" />
                                </Link>
                                <Link
                                    href="/services"
                                    className="text-sm uppercase tracking-widest text-[#23352d]/70 hover:text-[#23352d]"
                                >
                                    Services
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Media Strip */}
                <section className="mx-auto max-w-[1450px] px-4 lg:px-14 pb-14 lg:pb-20">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
                        {/* Image 1 (left) */}
                        <div className="lg:col-span-5 overflow-hidden border border-black/10 bg-black/5">
                            <div className="relative aspect-[16/10] w-full">
                                <Image
                                    fill
                                    src={`/${heroMedia.image1}`}
                                    alt="Website development visual"
                                    className="absolute inset-0 h-full w-full object-cover"
                                    loading="lazy"
                                />
                            </div>
                        </div>

                        {/* Video (center / big) */}
                        <div className="lg:col-span-4 overflow-hidden border border-black/10 bg-black/5">
                            <div className="relative aspect-[16/10] h-full w-full">
                                <video
                                    className="h-full w-full object-cover"
                                    src={"https://res.cloudinary.com/dixhnqcby/video/upload/v1766196661/Video4_s85cjm.mp4"}
                                    poster={`/${heroMedia.videoPoster}`}
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    preload="metadata"
                                />
                                <div className="pointer-events-none absolute inset-0 bg-black/10" />
                            </div>
                        </div>

                        {/* Image 2 (right) */}
                        <div className="lg:col-span-3 overflow-hidden border border-black/10 bg-black/5">
                            <div className="relative aspect-[16/10] h-full w-full">
                                <Image
                                    fill
                                    src={`/${heroMedia.image2}`}
                                    alt="UX and performance visual"
                                    className="h-full w-full object-cover"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Content */}
                <section className="mx-auto max-w-[1450px] px-4 lg:px-14 pb-24 lg:pb-32">
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 lg:gap-16">
                        {/* Left: Client */}
                        <div>
                            <div className="text-xs uppercase tracking-[0.22em] text-[#23352d]/60">
                                Client
                            </div>

                            <h2 className="mt-4 font-[PPPangaia] uppercase tracking-wide leading-[0.95] text-[clamp(1.8rem,3vw,2.6rem)]">
                                Bond & Vale
                            </h2>

                            <p className="mt-5 text-[#23352d]/75 leading-7 max-w-2xl">
                                Your website is not a page — it is proof. It is your sales engine,
                                your public office, your reputation in motion. At Bond & Vale, we
                                build narrative-led, conversion-intelligent digital platforms that
                                elevate positioning and drive meaningful action. Built in partnership
                                with a world-class development studio, each experience is crafted to
                                the level of refinement leaders expect.
                            </p>

                            {/* Deliverables */}
                            <div className="mt-10 border-t border-black/10 pt-8">
                                <div className="text-xs uppercase tracking-[0.22em] text-[#23352d]/60">
                                    What’s Included
                                </div>
                                <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-10">
                                    {deliverables.map((d) => (
                                        <li key={d} className="flex items-center gap-3">
                                            <span className="h-1.5 w-1.5 rounded-full bg-[#23352d]/50" />
                                            <span className="text-[#23352d]/80">{d}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Right: Process */}
                        <div>
                            <div className="text-xs uppercase tracking-[0.22em] text-[#23352d]/60">
                                Process
                            </div>

                            <div className="mt-6 space-y-4">
                                {process.map((p, idx) => (
                                    <div
                                        key={p.title}
                                        className="border border-black/10 bg-white/10 px-6 py-5"
                                    >
                                        <div className="flex items-center justify-between gap-6">
                                            <h3 className="font-serif text-xl leading-tight">
                                                {p.title}
                                            </h3>
                                            <div className="text-[10px] uppercase tracking-[0.22em] text-[#23352d]/55">
                                                {String(idx + 1).padStart(2, "0")}
                                            </div>
                                        </div>
                                        <p className="mt-3 text-[#23352d]/75 leading-7">
                                            {p.body}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* Bottom highlight */}
                            <div className="mt-8 border-t border-black/10 pt-8">
                                <div className="flex flex-wrap gap-3">
                                    <span className="rounded-full border border-black/10 bg-white/10 px-4 py-2 text-sm text-[#23352d]/80">
                                        100+ sites built.
                                    </span>
                                    <span className="rounded-full border border-black/10 bg-white/10 px-4 py-2 text-sm text-[#23352d]/80">
                                        93% performance score avg.
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </Wrapper>
    );
}
