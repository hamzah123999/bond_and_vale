"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { Mail, Phone, Eye, Trash2, X } from "lucide-react";
import Wrapper from "@/app/Wrapper";
import Header from "@/components/Header";
import { toast } from "sonner";

type InquiryDoc = {
    _id: string;
    firstName?: string;
    lastName?: string;
    email: string;
    phone?: string;
    message: string;
    status?: "new" | "read" | "replied"; // if you have it in schema
    source?: string;
    createdAt: string;
};

export default function SubmissionsPage() {
    const [submissions, setSubmissions] = useState<InquiryDoc[]>([]);
    const [active, setActive] = useState<InquiryDoc | null>(null);
    const [loading, setLoading] = useState(true);
    const [errMsg, setErrMsg] = useState<string>("");

    const formatDate = (iso: string) => {
        try {
            return new Date(iso).toISOString().slice(0, 10);
        } catch {
            return iso;
        }
    };

    const displayName = (s: InquiryDoc) => {
        const fn = s.firstName?.trim();
        const ln = s.lastName?.trim();
        const full = [fn, ln].filter(Boolean).join(" ");
        return full || "Unknown Sender";
    };

    useEffect(() => {
        const fetchSubmissions = async () => {
            setLoading(true);
            setErrMsg("");

            try {
                const res = await axios.get("/api/inquiries");
                if (res.data?.success) {
                    setSubmissions(res.data.inquiries || []);
                } else {
                    setErrMsg(res.data?.message || "Failed to load inquiries");
                }
            } catch (e: any) {
                setErrMsg(e?.response?.data?.message || e?.message || "Failed to load inquiries");
            } finally {
                setLoading(false);
            }
        };

        fetchSubmissions();
    }, []);

    // Optional: map status to your UI labels
    const badge = (status?: InquiryDoc["status"]) => {
        const s = (status || "new").toLowerCase();
        if (s === "new") return { label: "New", cls: "bg-green-100 text-green-700" };
        if (s === "read") return { label: "Read", cls: "bg-gray-200 text-gray-700" };
        if (s === "replied") return { label: "Replied", cls: "bg-blue-100 text-blue-700" };
        return { label: "New", cls: "bg-green-100 text-green-700" };
    };

    const openAndMarkRead = async (s: InquiryDoc) => {
        setActive(s);

        // if already read/replied, don't call API
        if (s.status && s.status !== "new") return;

        try {
            await axios.patch(`/api/inquiries/${s._id}`, { status: "read" });
            // update local state so badge changes immediately
            setSubmissions((prev) =>
                prev.map((x) => (x._id === s._id ? { ...x, status: "read" } : x))
            );

            // also update active modal state
            setActive((prev) => (prev?._id === s._id ? { ...prev, status: "read" } : prev));
        } catch (e: any) {
            toast.error (
                e?.response?.data?.message ||
                e?.message ||
                "Failed to mark as read."
            );
        }
    };

    const deleteInquiry = async (id: string) => {
        const ok = window.confirm("Delete this inquiry?");
        if (!ok) return;

        try {
            await axios.delete(`/api/inquiries/${id}`);

            // remove row from table
            setSubmissions((prev) => prev.filter((x) => x._id !== id));

            // if modal is open for same record, close it
            setActive((prev) => (prev?._id === id ? null : prev));

            toast.success("Deleted successfully.");
        } catch (e: any) {
            toast(
                e?.response?.data?.message ||
                e?.message ||
                "Failed to delete inquiry."
            );
        }
    };



    return (
        <main className="min-h-screen bg-[#e6d7c4] text-[#23352d]">
            <Header />

            <section className="mx-auto max-w-[1450px] px-4 lg:px-14 pt-14 lg:pt-20 pb-24">
                {/* Header */}
                <div className="flex items-end justify-between gap-6">
                    <div>
                        <div className="text-xs uppercase tracking-[0.22em] text-[#23352d]/60">
                            Admin / Forms
                        </div>
                        <h1 className="mt-4 font-[PPPangaia] uppercase leading-[0.95] tracking-wide text-[clamp(2rem,4vw,3.2rem)]">
                            Form Submissions
                        </h1>
                    </div>

                    <Link
                        href="/dashboard"
                        className="text-sm uppercase tracking-widest text-[#23352d]/70 hover:text-[#23352d]"
                    >
                        Back to Dashboard
                    </Link>
                </div>

                {/* States */}
                {loading && (
                    <div className="mt-10 text-sm text-[#23352d]/70">Loading submissions…</div>
                )}

                {!loading && errMsg && (
                    <div className="mt-10 text-sm text-red-700/80">{errMsg}</div>
                )}

                {/* Table */}
                {!loading && !errMsg && (
                    <div className="mt-12 overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="border-b border-black/10 text-left text-xs uppercase tracking-[0.22em] text-[#23352d]/60">
                                    <th className="pb-4">Sender</th>
                                    <th className="pb-4">Contact</th>
                                    <th className="pb-4">Message</th>
                                    <th className="pb-4">Date</th>
                                    <th className="pb-4 text-right">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {submissions.length === 0 ? (
                                    <tr className="border-b border-black/5">
                                        <td className="py-6 text-sm text-[#23352d]/70" colSpan={5}>
                                            No submissions yet.
                                        </td>
                                    </tr>
                                ) : (
                                    submissions.map((s) => {
                                        const b = badge(s.status);
                                        return (
                                            <tr
                                                key={s._id}
                                                className="border-b border-black/5 hover:bg-white/10 transition"
                                            >
                                                <td className="py-4">
                                                    <div className="font-medium">
                                                        {/* {displayName(s)} */}
                                                        User
                                                    </div>
                                                    <span
                                                        className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] uppercase tracking-widest ${b.cls}`}
                                                    >
                                                        {b.label}
                                                    </span>

                                                    {s.source ? (
                                                        <div className="mt-2 text-[11px] uppercase tracking-widest text-[#23352d]/45">
                                                            {s.source}
                                                        </div>
                                                    ) : null}
                                                </td>

                                                <td className="py-4">
                                                    <div className="flex items-center gap-2 text-sm">
                                                        <Mail className="h-4 w-4 text-[#23352d]/50" />
                                                        {s.email}
                                                    </div>
                                                    <div className="mt-1 flex items-center gap-2 text-sm text-[#23352d]/70">
                                                        <Phone className="h-4 w-4 text-[#23352d]/40" />
                                                        {s.phone || "—"}
                                                    </div>
                                                </td>

                                                <td className="py-4 max-w-md truncate text-[#23352d]/70">
                                                    {s.message}
                                                </td>

                                                <td className="py-4 text-sm text-[#23352d]/70">
                                                    {formatDate(s.createdAt)}
                                                </td>

                                                <td className="py-4">
                                                    <div className="flex justify-end gap-3">
                                                        <button
                                                            // onClick={() => setActive(s)}
                                                            onClick={() => openAndMarkRead(s)}
                                                            className="text-[#23352d]/60 hover:text-[#23352d]"
                                                            title="View message"
                                                        >
                                                            <Eye className="h-4 w-4" />
                                                        </button>

                                                        {/* Delete is UI-only right now (needs DELETE API). */}
                                                        <button
                                                            className="text-red-600/70 hover:text-red-700"
                                                            title="Delete"
                                                            onClick={() => deleteInquiry(s._id)}                                                        >
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
                    </div>
                )}
            </section>

            {/* Modal */}
            {active && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40">
                    <div className="w-full max-w-xl border border-black/10 bg-[#e6d7c4] p-6">
                        <div className="flex items-start justify-between gap-6">
                            <div>
                                <div className="text-xs uppercase tracking-[0.22em] text-[#23352d]/60">
                                    Message
                                </div>
                                <h3 className="mt-2 font-serif text-xl">{displayName(active)}</h3>
                            </div>

                            <button
                                onClick={() => setActive(null)}
                                className="text-[#23352d]/60 hover:text-[#23352d]"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="mt-6 space-y-3 text-sm">
                            <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-[#23352d]/50" />
                                {active.email}
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-[#23352d]/50" />
                                {active.phone || "—"}
                            </div>
                        </div>

                        <div className="mt-6 border-t border-black/10 pt-4 leading-7 text-[#23352d]/80">
                            {active.message}
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
