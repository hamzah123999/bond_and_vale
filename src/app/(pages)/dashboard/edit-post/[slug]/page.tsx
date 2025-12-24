"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { upload } from "@vercel/blob/client";
import { toast } from "sonner";
import {
    ArrowRight,
    Upload as UploadIcon,
    Save,
    Eye,
    FileText,
    Trash2,
} from "lucide-react";
import Header from "@/components/Header";

type BlogDoc = {
    _id: string;
    title: string;
    slug: string;
    category: string;
    excerpt?: string;
    heroImage?: string;
    readTime?: string;
    content: string;
    status: "draft" | "published";
    publishedAt?: string | null;
    createdAt: string;
};

function slugify(input: string) {
    return input
        .toLowerCase()
        .trim()
        .replace(/['"]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
}

export default function EditPostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const [initialSlug, setInitialSlug] = useState<string>("");

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);

    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState(""); // editable (optional)
    const [category, setCategory] = useState("");
    const [excerpt, setExcerpt] = useState("");
    const [content, setContent] = useState("");
    const [readTime, setReadTime] = useState("2m");
    const [status, setStatus] = useState<"draft" | "published">("draft");

    const [heroFile, setHeroFile] = useState<File | null>(null);
    const [heroUrl, setHeroUrl] = useState<string>("");

    const prettyDate = (iso?: string | null) => {
        if (!iso) return "—";
        try {
            return new Date(iso).toISOString().slice(0, 10);
        } catch {
            return String(iso);
        }
    };

    // load post
    useEffect(() => {
        const load = async () => {
            setLoading(true);
            try {
                const p = await params;
                setInitialSlug(p.slug);

                const res = await axios.get(`/api/blog/${p.slug}`);
                if (!res.data?.success || !res.data?.post) {
                    toast(res.data?.message || "Post not found");
                    setLoading(false);
                    return;
                }

                const post: BlogDoc = res.data.post;

                setTitle(post.title || "");
                setSlug(post.slug || p.slug);
                setCategory(post.category || "");
                setExcerpt(post.excerpt || "");
                setContent(post.content || "");
                setReadTime(post.readTime || "2m");
                setStatus(post.status || "draft");
                setHeroUrl(post.heroImage || "");
            } catch (e: any) {
                toast(e?.response?.data?.message || e?.message || "Failed to load post");
            } finally {
                setLoading(false);
            }
        };

        load();
    }, [params]);

    // if you want auto-slug from title (button-style helper)
    const autoSlug = useMemo(() => slugify(title), [title]);

    const uploadFeaturedImage = async () => {
        if (!heroFile) {
            toast("Please select an image first.");
            return "";
        }

        setUploading(true);
        try {
            const blob = await upload(heroFile.name, heroFile, {
                access: "public",
                handleUploadUrl: "/api/upload",
            });

            setHeroUrl(blob.url);
            toast("Featured image uploaded.");
            return blob.url;
        } catch (e: any) {
            toast(e?.message || "Image upload failed");
            return "";
        } finally {
            setUploading(false);
        }
    };

    const updatePost = async (nextStatus?: "draft" | "published") => {
        if (saving) return;

        const next = nextStatus ?? status;

        if (!title || !category || !content) {
            toast("Title, category, and content are required.");
            return;
        }

        // slug optional, but if you keep it editable, ensure it is valid
        const finalSlug = slug?.trim() || autoSlug;
        if (!finalSlug) {
            toast("Slug is required (or use auto slug).");
            return;
        }

        setSaving(true);
        try {
            // upload if user chose a new file
            let finalHero = heroUrl;
            if (heroFile) {
                finalHero = await uploadFeaturedImage();
            }

            const res = await axios.patch(`/api/blog/${initialSlug}`, {
                title,
                slug: finalSlug,
                category,
                excerpt,
                readTime,
                content,
                heroImage: finalHero,
                status: next,
                // if publishing now, you can let API set publishedAt automatically
            });

            if (res.data?.success) {
                toast(next === "published" ? "Post published." : "Post saved.");
                // if slug changed, update initialSlug so future PATCH works
                setInitialSlug(finalSlug);
            } else {
                toast(res.data?.message || "Failed to update post");
            }
        } catch (e: any) {
            toast(e?.response?.data?.message || e?.message || "Failed to update post");
        } finally {
            setSaving(false);
            setHeroFile(null);
        }
    };

    const deletePost = async () => {
        const ok = window.confirm("Delete this post?");
        if (!ok) return;

        try {
            await axios.delete(`/api/blog/${initialSlug}`);
            toast("Post deleted.");
            // redirect to dashboard
            window.location.href = "/dashboard";
        } catch (e: any) {
            toast(e?.response?.data?.message || e?.message || "Failed to delete post");
        }
    };

    return (
        <main className="min-h-screen bg-[#e6d7c4] text-[#23352d]">
            <Header />

            <section className="mx-auto max-w-[1450px] px-4 lg:px-14 pt-14 lg:pt-20 pb-24">
                {/* Header */}
                <div className="flex flex-wrap items-end justify-between gap-6">
                    <div>
                        <div className="text-xs uppercase tracking-[0.22em] text-[#23352d]/60">
                            Admin / Blog
                        </div>
                        <h1 className="mt-4 font-[PPPangaia] uppercase leading-[0.95] tracking-wide text-[clamp(2rem,4vw,3.2rem)]">
                            Edit Post
                        </h1>
                        <div className="mt-2 text-sm text-[#23352d]/60">
                            Current slug: <span className="font-mono">{initialSlug || "—"}</span>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <Link
                            href="/dashboard"
                            className="text-sm uppercase tracking-widest text-[#23352d]/70 hover:text-[#23352d]"
                        >
                            Back to Dashboard
                        </Link>

                        <Link
                            href={`/blog/${initialSlug}`}
                            className="text-sm uppercase tracking-widest text-[#23352d]/70 hover:text-[#23352d]"
                        >
                            View Live
                        </Link>
                    </div>
                </div>

                {loading ? (
                    <div className="mt-10 text-sm text-[#23352d]/70">Loading post…</div>
                ) : (
                    <div className="mt-12 grid grid-cols-1 lg:grid-cols-[1.6fr_0.4fr] gap-10">
                        {/* LEFT – CONTENT */}
                        <div className="space-y-8">
                            {/* Title */}
                            <div>
                                <label className="text-xs uppercase tracking-[0.22em] text-[#23352d]/60">
                                    Post Title
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter blog title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="mt-2 w-full border border-black/10 bg-white/20 px-5 py-4 text-lg outline-none focus:border-black/20"
                                    disabled={saving || uploading}
                                />
                            </div>

                            {/* Slug */}
                            <div>
                                <div className="flex items-center justify-between">
                                    <label className="text-xs uppercase tracking-[0.22em] text-[#23352d]/60">
                                        Slug
                                    </label>

                                    <button
                                        type="button"
                                        onClick={() => setSlug(autoSlug)}
                                        className="text-[10px] uppercase tracking-[0.22em] text-[#23352d]/60 hover:text-[#23352d]"
                                        disabled={saving || uploading}
                                    >
                                        Use auto slug
                                    </button>
                                </div>

                                <input
                                    type="text"
                                    placeholder="your-post-slug"
                                    value={slug}
                                    onChange={(e) => setSlug(e.target.value)}
                                    className="mt-2 w-full border border-black/10 bg-white/20 px-5 py-3 text-sm outline-none focus:border-black/20 font-mono"
                                    disabled={saving || uploading}
                                />
                            </div>

                            {/* Category */}
                            <div>
                                <label className="text-xs uppercase tracking-[0.22em] text-[#23352d]/60">
                                    Category
                                </label>
                                <input
                                    type="text"
                                    placeholder="post category (eg: Trend)"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="mt-2 w-full border border-black/10 bg-white/20 px-5 py-3 text-sm outline-none focus:border-black/20"
                                    disabled={saving || uploading}
                                />
                            </div>

                            {/* Read Time */}
                            <div>
                                <label className="text-xs uppercase tracking-[0.22em] text-[#23352d]/60">
                                    Read Time
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g. 2m"
                                    value={readTime}
                                    onChange={(e) => setReadTime(e.target.value)}
                                    className="mt-2 w-full border border-black/10 bg-white/20 px-5 py-3 text-sm outline-none focus:border-black/20"
                                    disabled={saving || uploading}
                                />
                            </div>

                            {/* Excerpt */}
                            <div>
                                <label className="text-xs uppercase tracking-[0.22em] text-[#23352d]/60">
                                    Excerpt
                                </label>
                                <textarea
                                    rows={3}
                                    placeholder="Short summary shown on blog listing"
                                    value={excerpt}
                                    onChange={(e) => setExcerpt(e.target.value)}
                                    className="mt-2 w-full border border-black/10 bg-white/20 px-5 py-4 outline-none focus:border-black/20"
                                    disabled={saving || uploading}
                                />
                            </div>

                            {/* Content */}
                            <div>
                                <label className="text-xs uppercase tracking-[0.22em] text-[#23352d]/60">
                                    Content
                                </label>
                                <textarea
                                    rows={14}
                                    placeholder="Write the full blog content here..."
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    className="mt-2 w-full border border-black/10 bg-white/20 px-5 py-4 leading-7 outline-none focus:border-black/20"
                                    disabled={saving || uploading}
                                />
                            </div>
                        </div>

                        {/* RIGHT – SIDEBAR */}
                        <div className="space-y-6">
                            {/* Publish Box */}
                            <div className="border border-black/10 bg-white/10 p-6">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-serif text-xl">Publish</h3>
                                    <FileText className="h-5 w-5 text-[#23352d]/60" />
                                </div>

                                <div className="mt-4 text-sm text-[#23352d]/60">
                                    Status:{" "}
                                    <span className="font-medium uppercase">{status}</span>
                                </div>

                                <div className="mt-2 text-sm text-[#23352d]/60">
                                    Last update:{" "}
                                    <span className="font-mono">
                                        {prettyDate(new Date().toISOString())}
                                    </span>
                                </div>

                                <div className="mt-6 flex flex-col gap-3">
                                    <button
                                        disabled={saving || uploading}
                                        onClick={() => {
                                            setStatus("draft");
                                            updatePost("draft");
                                        }}
                                        className="inline-flex items-center justify-center gap-2 rounded-full border border-black/15 bg-white/20 px-4 py-3 text-sm hover:bg-white/30 disabled:opacity-60"
                                    >
                                        <Save className="h-4 w-4" />
                                        {saving ? "Saving..." : "Save Draft"}
                                    </button>

                                    <button
                                        disabled={saving || uploading}
                                        onClick={() => {
                                            setStatus("published");
                                            updatePost("published");
                                        }}
                                        className="inline-flex items-center justify-center gap-2 rounded-full border border-black/15 bg-[#3f4b3f] px-4 py-3 text-sm text-[#e6d7c4] hover:opacity-90 disabled:opacity-60"
                                    >
                                        <ArrowRight className="h-4 w-4" />
                                        {saving ? "Publishing..." : "Publish"}
                                    </button>

                                    <button
                                        disabled={saving || uploading}
                                        onClick={deletePost}
                                        className="inline-flex items-center justify-center gap-2 rounded-full border border-black/15 bg-red-600/10 px-4 py-3 text-sm text-red-700 hover:bg-red-600/15 disabled:opacity-60"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                        Delete Post
                                    </button>
                                </div>
                            </div>

                            {/* Featured Image */}
                            <div className="border border-black/10 bg-white/10 p-6">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-serif text-xl">Featured Image</h3>
                                    <Eye className="h-5 w-5 text-[#23352d]/60" />
                                </div>

                                <div className="mt-4 flex flex-col items-center justify-center border border-dashed border-black/20 bg-white/20 px-4 py-10 text-center">
                                    <UploadIcon className="h-6 w-6 text-[#23352d]/50" />
                                    <p className="mt-2 text-sm text-[#23352d]/60">
                                        {heroUrl ? "Current image is set" : "No image set"}
                                    </p>

                                    {heroUrl ? (
                                        <a
                                            href={heroUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="mt-2 text-xs uppercase tracking-widest text-[#23352d]/60 hover:text-[#23352d]"
                                        >
                                            View current image
                                        </a>
                                    ) : null}

                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="mt-4 w-full text-sm"
                                        onChange={(e) => setHeroFile(e.target.files?.[0] || null)}
                                        disabled={uploading || saving}
                                    />

                                    <button
                                        disabled={!heroFile || uploading || saving}
                                        onClick={uploadFeaturedImage}
                                        className="mt-4 inline-flex items-center justify-center gap-2 rounded-full border border-black/15 bg-white/20 px-4 py-2 text-sm hover:bg-white/30 disabled:opacity-60"
                                    >
                                        <UploadIcon className="h-4 w-4" />
                                        {uploading ? "Uploading..." : "Upload New Image"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </main>
    );
}
