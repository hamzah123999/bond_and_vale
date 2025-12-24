"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import Wrapper from "@/app/Wrapper";
import Header from "@/components/Header";
import DecryptedText from "@/components/DecryptedText";
import TabLoader from "@/components/Loader";

type BlogDoc = {
    _id: string;
    title: string;
    slug: string;
    category: string;
    readTime?: string;
    publishedAt?: string | null;
    createdAt: string;
};

export default function Blog() {
    const [blogs, setBlogs] = useState<BlogDoc[]>([]);
    const [loading, setLoading] = useState(true);
    const [errMsg, setErrMsg] = useState("");

    const formatPrettyDate = (iso?: string | null) => {
        if (!iso) return "";
        const d = new Date(iso);
        if (Number.isNaN(d.getTime())) return iso;

        return d.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "2-digit",
        });
    };

    useEffect(() => {
        const fetchBlogs = async () => {
            setLoading(true);
            setErrMsg("");

            try {
                // only published posts for public blog page
                const res = await axios.get("/api/blog?status=published&limit=50&page=1");
                if (res.data?.success) {
                    setBlogs(res.data.posts || []);
                } else {
                    setErrMsg(res.data?.message || "Failed to load blogs");
                }
            } catch (e: any) {
                setErrMsg(e?.response?.data?.message || e?.message || "Failed to load blogs");
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    return (
        <Wrapper>
            <TabLoader direction="top" speed={1.4} minDuration={2000} />
            <section className="bg-[#eadcc9] text-[#0e221c]">
                <Header />

                <div className="mx-auto max-w-[1400px] px-4 md:px-10 py-14 md:py-20">
                    {/* Top intro */}
                    <div className="mx-auto max-w-3xl text-center">
                        <div className="font-[PPPangaia] text-lg font-semibold tracking-widest uppercase text-[#0e221c]/70">
                            Blogs
                        </div>

                        <p className="mt-6 leading-6 md:leading-7 text-[#0e221c]/60">
                            The Bond &amp; Vale journal explores branding, public relations, and strategic
                            communication through a thoughtful lens. Here we share insights, perspectives,
                            and practical guidance on building strong narratives, shaping reputation, and
                            creating long-term brand value in a changing landscape.
                        </p>
                    </div>

                    {/* States */}
                    {loading && (
                        <div className="mt-14 text-center text-sm text-[#0e221c]">
                            Loading posts…
                        </div>
                    )}

                    {!loading && errMsg && (
                        <div className="mt-14 text-center text-sm text-red-700/80">
                            {errMsg}
                        </div>
                    )}

                    {!loading && !errMsg && blogs.length === 0 && (
                        <div className="mt-14 text-center text-sm text-[#0e221c]">
                            No posts yet.
                        </div>
                    )}

                    {/* List */}
                    {!loading && !errMsg && blogs.length > 0 && (
                        <div className="mt-14 md:mt-16">
                            {blogs.map((item) => {
                                const date = formatPrettyDate(item.publishedAt || item.createdAt);
                                const readTime = item.readTime || "—";

                                return (
                                    <Link
                                        key={item._id}
                                        href={`/blog/${item.slug}`}
                                        className="group block border-b border-[#0e221c]/45"
                                    >
                                        <div className="py-8 md:py-10">
                                            {/* Big title */}
                                            <h2 className="text-center font-[PPPangaia] uppercase tracking-wide leading-[1.1] md:leading-[1.2] text-[clamp(1.2rem,5.7vw,2rem)] text-[#0e221c] transition-colors duration-300">
                                                <DecryptedText
                                                    text={item.title}
                                                    className=""
                                                    useOriginalCharsOnly
                                                    animateOn="hover"
                                                    parentClassName="text-[#0e221c] cursor-pointer"
                                                    speed={50}
                                                />
                                            </h2>

                                            {/* Meta row */}
                                            <div className="mt-4 flex items-center justify-center gap-10 md:gap-16 text-[#0e221c]/70">
                                                <span>{item.category}</span>
                                                <span>{date}</span>
                                                <span>{readTime}</span>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>
        </Wrapper>
    );
}
