"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import TicketButton from "@/components/TicketButton";
import DecryptedText from "./DecryptedText";
import SplitText from "./SplitText";

type BlogItem = {
    href: string;
    category: string;
    title: string;
    excerpt: string;
};

type BlogDoc = {
    _id: string;
    slug: string;
    title: string;
    category: string;
    excerpt?: string;
};

export default function BlogSection({
    title = "BLOGS & NEWS",
    intro,
    buttonHref = "/blog",
    buttonLabel = "All blogs",
}: {
    title?: string;
    intro: string;
    buttonHref?: string;
    buttonLabel?: string;
}) {
    const [items, setItems] = useState<BlogItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [errMsg, setErrMsg] = useState("");

    useEffect(() => {
        const fetchTopBlogs = async () => {
            setLoading(true);
            setErrMsg("");

            try {
                const res = await axios.get("/api/blog?status=published&limit=3&page=1");

                if (res.data?.success) {
                    const posts: BlogDoc[] = res.data.posts || [];
                    const mapped: BlogItem[] = posts.slice(0, 3).map((p) => ({
                        href: `/blog/${p.slug}`,
                        category: p.category || "Blog",
                        title: p.title,
                        excerpt: (p.excerpt || "").trim() || "Read more",
                    }));

                    setItems(mapped);
                } else {
                    setItems([]);
                    setErrMsg(res.data?.message || "Failed to load posts");
                }
            } catch (e: any) {
                setItems([]);
                setErrMsg(e?.response?.data?.message || e?.message || "Failed to load posts");
            } finally {
                setLoading(false);
            }
        };

        fetchTopBlogs();
    }, []);

    const handleAnimationComplete = () => { };

    return (
        <section className="bg-[#e6d7c4] text-[#0e221c]">
            <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-14 py-12 lg:py-16">
                <h2>
                    <SplitText
                        text={title}
                        className="font-[PPPangaia] uppercase tracking-wide leading-[0.9] text-[clamp(2rem,6vw,3.5rem)]"
                        delay={150}
                        duration={2}
                        splitType="lines"
                        from={{ opacity: 0, y: 100 }}
                        onLetterAnimationComplete={handleAnimationComplete}
                    />
                </h2>

                <div className="mt-6 h-px w-full bg-[#0e221c]/40" />

                <div className="mt-10 grid grid-cols-1 lg:grid-cols-[0.9fr_1.6fr] gap-10 lg:gap-16">
                    <div className="flex md:pt-7">
                        <p data-aos="fade-up" className="max-w-md text-[#0e221c]/70">
                            {intro}
                        </p>
                    </div>

                    <div className="flex flex-col">
                        <div className="divide-y divide-[#0e221c]/25 border-t border-[#0e221c]/0">
                            {loading ? (
                                <div className="py-7 text-sm text-[#0e221c]/60">
                                    Loading posts…
                                </div>
                            ) : errMsg ? (
                                <div className="py-7 text-sm text-red-700/80">{errMsg}</div>
                            ) : items.length === 0 ? (
                                <div className="py-7 text-sm text-[#0e221c]/60">
                                    No posts yet.
                                </div>
                            ) : (
                                items.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        data-aos="fade-up"
                                        className="group grid grid-cols-1 md:items-end md:grid-cols-[1.1fr_1.5fr] gap-3 md:gap-8 py-7"
                                    >
                                        <div>
                                            <div className="text-[#0e221c]/85 mb-2">
                                                {item.category}
                                            </div>
                                            <div className="font-serif">
                                                <DecryptedText
                                                    text={item.title}
                                                    useOriginalCharsOnly
                                                    animateOn="hover"
                                                    parentClassName="text-[#0e221c] text-lg cursor-pointer"
                                                    speed={50}
                                                />
                                            </div>
                                        </div>

                                        <div className="md:text-right text-[#0e221c]/70 text-[15px] leading-7">
                                            {item.excerpt}
                                            <span className="ml-2 inline-block opacity-0 translate-x-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                                                →
                                            </span>
                                        </div>
                                    </Link>
                                ))
                            )}
                        </div>

                        <div className="mt-8 flex justify-start lg:justify-end">
                            <TicketButton href={buttonHref} label={buttonLabel} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
