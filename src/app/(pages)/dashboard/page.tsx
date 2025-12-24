"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import axios from "axios";
import {
    FileText,
    Plus,
    Eye,
    Pencil,
    Trash2,
    MessageSquare,
    Book,
    LogOut,
} from "lucide-react";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import TabLoader from "@/components/Loader";

type InquiryDoc = {
    _id: string;
};

type BlogDoc = {
    _id: string;
    title: string;
    slug: string;
    status: "draft" | "published";
    publishedAt?: string | null;
    createdAt: string;
};

export default function AdminDashboard() {
    const router = useRouter();

    const [inquiriesCount, setInquiriesCount] = useState(0);
    const [blogs, setBlogs] = useState<BlogDoc[]>([]);
    const [loading, setLoading] = useState(true);
    const [errMsg, setErrMsg] = useState("");
    const [loggingOut, setLoggingOut] = useState(false);

    const publishedCount = useMemo(
        () => blogs.filter((b) => b.status === "published").length,
        [blogs]
    );
    const draftCount = useMemo(
        () => blogs.filter((b) => b.status === "draft").length,
        [blogs]
    );

    const formatDate = (iso?: string | null) => {
        if (!iso) return "—";
        try {
            return new Date(iso).toISOString().slice(0, 10);
        } catch {
            return String(iso);
        }
    };

    const fetchDashboardData = async () => {
        setLoading(true);
        setErrMsg("");

        try {
            const inquiriesRes = await axios.get("/api/inquiries");
            if (inquiriesRes.data?.success) {
                const list: InquiryDoc[] = inquiriesRes.data.inquiries || [];
                setInquiriesCount(list.length);
            }

            const blogsRes = await axios.get("/api/blog?status=all&limit=20&page=1");
            if (blogsRes.data?.success) {
                setBlogs(blogsRes.data.posts || []);
            } else {
                setErrMsg(blogsRes.data?.message || "Failed to load blog posts");
            }
        } catch (e: any) {
            setErrMsg(
                e?.response?.data?.message || e?.message || "Failed to load dashboard"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const handleView = (slug: string) => {
        router.push(`/blog/${slug}`);
    };

    const handleEdit = (slug: string) => {
        router.push(`/dashboard/edit-post/${slug}`);
    };

    const handleDelete = async (slug: string) => {
        const ok = window.confirm("Delete this blog post?");
        if (!ok) return;

        try {
            await axios.delete(`/api/blog/${slug}`);
            setBlogs((prev) => prev.filter((b) => b.slug !== slug));
            toast("Blog deleted successfully.");
        } catch (e: any) {
            toast(
                e?.response?.data?.message || e?.message || "Failed to delete blog."
            );
        }
    };

    // ✅ LOGOUT
    const handleLogout = async () => {
        if (loggingOut) return;
        setLoggingOut(true);

        try {
            // Better Auth logout
            const { error } = await authClient.signOut();

            if (error) {
                toast(error.message || "Logout failed");
                return;
            }

            toast("Logged out successfully.");
            router.replace("/login");
        } catch (e: any) {
            toast(e?.message || "Logout failed");
        } finally {
            setLoggingOut(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#e6d7c4] text-[#23352d]">
            <TabLoader direction="top" speed={1.4} minDuration={2000} />
            <Header />

            <section className="mx-auto max-w-[1450px] px-4 lg:px-14 pt-14 lg:pt-20 pb-24">
                {/* Heading */}
                <div className="flex flex-wrap items-end justify-between gap-6">
                    <div>
                        <div className="text-xs uppercase tracking-[0.22em] text-[#23352d]/60">
                            Admin Dashboard
                        </div>
                        <h1 className="mt-4 font-[PPPangaia] uppercase leading-[0.95] tracking-wide text-[clamp(2.2rem,4.5vw,3.6rem)]">
                            Control Center
                        </h1>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3">
                        <Link
                            href="/dashboard/create-post"
                            className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-[#3f4b3f] px-5 py-3 text-sm text-[#e6d7c4] hover:opacity-90 transition"
                        >
                            <Plus className="h-4 w-4" />
                            Create Post
                        </Link>

                        <Link
                            href="/dashboard/submissions"
                            className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white/20 px-5 py-3 text-sm text-[#23352d] hover:bg-white/30 transition"
                        >
                            <Book className="h-4 w-4" />
                            Form Submissions
                        </Link>

                        {/* ✅ Logout */}
                        <button
                            onClick={handleLogout}
                            disabled={loggingOut}
                            className="inline-flex items-center gap-2 rounded-full bg-red-500 px-5 py-3 text-sm text-[#fff] hover:bg-red-600 cursor-pointer transition disabled:opacity-60"
                        >
                            <LogOut className="h-4 w-4" />
                            {loggingOut ? "Logging out..." : "Logout"}
                        </button>
                    </div>
                </div>

                {/* Stats */}
                <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border border-black/10 bg-white/10 px-5 py-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="font-serif text-3xl leading-none">
                                    {loading ? "—" : inquiriesCount}
                                </div>
                                <div className="mt-2 text-[10px] uppercase tracking-[0.22em] text-[#23352d]/60">
                                    Form Submissions
                                </div>
                            </div>
                            <MessageSquare className="h-5 w-5 text-[#23352d]/50" />
                        </div>
                    </div>

                    <div className="border border-black/10 bg-white/10 px-5 py-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="font-serif text-3xl leading-none">
                                    {loading ? "—" : publishedCount}
                                </div>
                                <div className="mt-2 text-[10px] uppercase tracking-[0.22em] text-[#23352d]/60">
                                    Published Blogs
                                </div>
                            </div>
                            <FileText className="h-5 w-5 text-[#23352d]/50" />
                        </div>
                    </div>

                    <div className="border border-black/10 bg-white/10 px-5 py-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="font-serif text-3xl leading-none">
                                    {loading ? "—" : draftCount}
                                </div>
                                <div className="mt-2 text-[10px] uppercase tracking-[0.22em] text-[#23352d]/60">
                                    Draft Posts
                                </div>
                            </div>
                            <FileText className="h-5 w-5 text-[#23352d]/50" />
                        </div>
                    </div>
                </div>

                {/* Blog Table */}
                <div className="mt-16">
                    <div className="flex items-center justify-between">
                        <h2 className="font-serif text-2xl">Blog Posts</h2>
                    </div>

                    {/* ✅ Responsive wrapper */}
                    <div className="mt-6 overflow-x-auto">
                        {loading && (
                            <div className="py-6 text-sm text-[#23352d]/70">
                                Loading blog posts…
                            </div>
                        )}

                        {!loading && errMsg && (
                            <div className="py-6 text-sm text-red-700/80">{errMsg}</div>
                        )}

                        {!loading && !errMsg && (
                            <table className="w-full min-w-[900px] border-collapse">
                                <thead>
                                    <tr className="border-b border-black/10 text-left text-xs uppercase tracking-[0.22em] text-[#23352d]/60 whitespace-nowrap">
                                        <th className="pb-4">Title</th>
                                        <th className="pb-4">Status</th>
                                        <th className="pb-4">Date</th>
                                        <th className="pb-4 text-right">Actions</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {blogs.length === 0 ? (
                                        <tr className="border-b border-black/5">
                                            <td
                                                className="py-6 text-sm text-[#23352d]/70"
                                                colSpan={4}
                                            >
                                                No blog posts yet.
                                            </td>
                                        </tr>
                                    ) : (
                                        blogs.map((blog) => {
                                            const isPublished = blog.status === "published";
                                            const badgeLabel = isPublished ? "Published" : "Draft";
                                            const badgeClass = isPublished
                                                ? "bg-green-100 text-green-700"
                                                : "bg-yellow-100 text-yellow-700";

                                            const dateValue = isPublished
                                                ? formatDate(blog.publishedAt)
                                                : formatDate(blog.createdAt);

                                            return (
                                                <tr key={blog._id} className="border-b border-black/5">
                                                    <td className="py-4 font-medium whitespace-nowrap">
                                                        {blog.title}
                                                    </td>

                                                    <td className="py-4 whitespace-nowrap">
                                                        <span
                                                            className={`rounded-full px-3 py-1 text-xs ${badgeClass}`}
                                                        >
                                                            {badgeLabel}
                                                        </span>
                                                    </td>

                                                    <td className="py-4 text-[#23352d]/70 whitespace-nowrap">
                                                        {dateValue}
                                                    </td>

                                                    <td className="py-4 whitespace-nowrap">
                                                        <div className="flex justify-end gap-3">
                                                            <button
                                                                onClick={() => handleView(blog.slug)}
                                                                className="text-[#23352d]/60 hover:text-[#23352d]"
                                                                title="View"
                                                            >
                                                                <Eye className="h-4 w-4" />
                                                            </button>

                                                            <button
                                                                onClick={() => handleEdit(blog.slug)}
                                                                className="text-[#23352d]/60 hover:text-[#23352d]"
                                                                title="Edit"
                                                            >
                                                                <Pencil className="h-4 w-4" />
                                                            </button>

                                                            <button
                                                                onClick={() => handleDelete(blog.slug)}
                                                                className="text-red-600/70 hover:text-red-700"
                                                                title="Delete"
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}
