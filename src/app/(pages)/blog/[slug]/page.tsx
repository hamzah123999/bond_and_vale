"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Wrapper from "@/app/Wrapper";
import Header from "@/components/Header";
import { ParallaxImage } from "@/components/ParallaxImage";

type BlogDoc = {
    _id: string;
    title: string;
    slug: string;
    category: string;
    heroImage?: string;
    content: string;
    status: "draft" | "published";
    publishedAt?: string | null;
    createdAt: string;
};

export default function BlogPostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const [post, setPost] = useState<BlogDoc | null>(null);
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
        const load = async () => {
            setLoading(true);
            setErrMsg("");

            try {
                const { slug } = await params;
                const res = await axios.get(`/api/blog/${slug}`);

                if (res.data?.success && res.data?.post) {
                    setPost(res.data.post);
                } else {
                    setErrMsg(res.data?.message || "Post not found");
                }
            } catch (e: any) {
                setErrMsg(e?.response?.data?.message || e?.message || "Post not found");
            } finally {
                setLoading(false);
            }
        };

        load();
    }, [params]);

    // basic content rendering (plain text -> paragraphs)
    const renderContent = (text: string) => {
        return text
            .split(/\n\s*\n/g) // split by empty lines
            .map((p) => p.trim())
            .filter(Boolean)
            .map((p, i) => (
                <p key={i} className="leading-7">
                    {p}
                </p>
            ));
    };

    return (
        <Wrapper>
            <main className="bg-[#e6d7c4] text-[#0e221c]">
                <Header />

                {loading && (
                    <div className="mx-auto max-w-[1400px] px-4 md:px-10 pt-16 pb-24 text-sm text-[#0e221c]/70">
                        Loading post…
                    </div>
                )}

                {!loading && errMsg && (
                    <div className="mx-auto max-w-[1400px] px-4 md:px-10 pt-16 pb-24 text-sm text-red-700/80">
                        {errMsg}
                    </div>
                )}

                {!loading && post && (
                    <>
                        {/* Top Header Area */}
                        <section className="relative">
                            <div className="mx-auto max-w-[1400px] px-4 md:px-10 pt-14 md:pt-20">
                                <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.3fr_0.7fr] items-start">
                                    {/* Left: Big Title */}
                                    <h1 className="font-[PPPangaia] uppercase tracking-wide leading-[0.95] text-[clamp(1.6rem,5.5vw,3.3rem)]">
                                        {post.title}
                                    </h1>

                                    {/* Right: Meta */}
                                    <div className="flex md:justify-end gap-16 text-sm uppercase tracking-widest text-[#0e221c]/65">
                                        <div className="text-right">
                                            <div className="mt-2">{post.category}</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="mt-2">
                                                {formatPrettyDate(post.publishedAt || post.createdAt)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Hero Image */}
                            <div className="mx-auto max-w-[1400px] px-4 md:px-10 mt-10 md:mt-14 pb-10 md:pb-14">
                                <div className="relative overflow-hidden">
                                    <div className="relative aspect-[21/9] md:aspect-[24/9] w-full">
                                        <ParallaxImage
                                            speed={30}
                                            src={post.heroImage || "/img2.jpg"}
                                            alt={post.title}
                                            className="rounded-lg h-full w-full object-cover"
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Content */}
                        <section className="mx-auto max-w-[1400px] px-4 md:px-10 pb-20 md:pb-28">
                            <article className="space-y-6 text-[#0e221c]/80">
                                {renderContent(post.content)}
                            </article>
                        </section>
                    </>
                )}
            </main>
        </Wrapper>
    );
}
