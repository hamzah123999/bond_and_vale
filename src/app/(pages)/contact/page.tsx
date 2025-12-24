"use client";

import React, { useState } from "react";
import Wrapper from "@/app/Wrapper";
import Header from "@/components/Header";
import SplitText from "@/components/SplitText";
import TicketButton from "@/components/TicketButton";
import Link from "next/link";
import Script from "next/script";
import axios from "axios";
import { toast } from "sonner";
import TabLoader from "@/components/Loader";

export default function Contact() {
    const handleAnimationComplete = () => { };

    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (loading) return;

        // Basic frontend validation
        if (!email || !message) {
            toast("Email and message are required.");
            return;
        }

        setLoading(true);
        try {
            const res = await axios.post("/api/inquiries", {
                email,
                phone,
                message,
                source: "contact-page",
                status: "new",
            });

            if (res.data?.success) {
                toast(res.data?.message || "Submitted successfully!");
                setEmail("");
                setPhone("");
                setMessage("");
            } else {
                toast(res.data?.message || "Submission failed.");
            }
        } catch (err: any) {
            const apiMsg = err?.response?.data?.message;
            toast(apiMsg || err?.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    // Calendly URL (keep month param if client wants default month)
    const calendlyUrl =
        "https://calendly.com/bondandvale-meeting/discovery-session?month=2025-12";

    return (
        <Wrapper>
            <TabLoader direction="top" speed={1.4} minDuration={2000} />
            <div className="bg-[#e0d1be] min-h-screen">
                <Header />

                <div className="mx-auto max-w-[1450px] px-4 md:px-6 lg:px-14 pt-20 pb-10 md:pb-44">
                    <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-14 gap-8">
                        <div>
                            <p className="text-sm text-[#0e221c]/90 mb-5">
                                Send us an email
                            </p>

                            <Link href={"mailto:info@bondandvale.com"}>
                                <SplitText
                                    text="info@bondandvale.com"
                                    className="font-[PPPangaia] uppercase hover:underline !text-start leading-tight text-[clamp(1.5rem,5.5vw,2.2rem)] max-w-xl"
                                    delay={150}
                                    duration={2}
                                    splitType="lines"
                                    from={{ opacity: 0, y: 100 }}
                                    onLetterAnimationComplete={handleAnimationComplete}
                                />
                            </Link>
                        </div>

                        {/* NO FORM — Enter will not submit */}
                        <div className="space-y-2">
                            <div className="grid grid-cols-2 md:gap-4 gap-2">
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm text-[#0e221c]/90">
                                        Email Address
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-[#f4ebd0]/70 mt-1 px-4 py-2.5 outline-none"
                                        disabled={loading}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="phone" className="text-sm text-[#0e221c]/90">
                                        Phone
                                    </label>
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="w-full bg-[#f4ebd0]/70 mt-1 px-4 py-2.5 outline-none"
                                        disabled={loading}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm text-[#0e221c]/90">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={1}
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="w-full bg-[#f4ebd0]/70 mt-1 px-4 py-2.5 outline-none resize-none"
                                    disabled={loading}
                                />
                            </div>

                            <p className="text-sm text-[#0e221c]/90 mb-5">
                                By clicking Let's Bond, you agree to our Terms and Conditions and
                                Privacy Policy
                            </p>

                            {/* Click only */}
                            <div
                                onClick={handleSubmit}
                                className={loading ? "opacity-70 pointer-events-none" : ""}
                            >
                                <TicketButton
                                    href="#"
                                    label={loading ? "Submitting..." : "Let's Bond"}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Calendly Section */}
                    <div id="calender" className="mt-24 md:mt-40">
                        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                            <div>
                                <p className="text-sm opacity-50 max-w-xs tracking-wide">
                                    PLAN AN INTRODUCTORY CALL WITH ONE OF OUR CONSULTANTS
                                </p>
                                <h2 className="mt-3 font-[PPPangaia] uppercase text-[#2f352c] leading-tight text-[clamp(1.6rem,4vw,2.4rem)]">
                                    Book a Discovery Session
                                </h2>
                                <p className="mt-3 text-sm text-[#0e221c]/80 max-w-2xl">
                                    Choose a time that works for you. You’ll receive a confirmation
                                    email with all the details.
                                </p>
                            </div>

                            <Link
                                href={calendlyUrl}
                                target="_blank"
                                className="text-sm text-[#2f352c] underline underline-offset-4 hover:opacity-80"
                            >
                                Open scheduling in a new tab
                            </Link>
                        </div>

                        {/* Calendly script */}
                        <Script
                            src="https://assets.calendly.com/assets/external/widget.js"
                            strategy="afterInteractive"
                        />

                        {/* Embed container */}
                        <div className="mt-8">
                            <div className="rounded-2xl overflow-hidden border border-[#0e221c]/10 bg-[#f4ebd0]/40 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
                                <div
                                    className="calendly-inline-widget"
                                    data-url={calendlyUrl}
                                    style={{
                                        minWidth: "320px",
                                        height: "780px",
                                    }}
                                />
                            </div>

                            <p className="mt-4 text-xs text-[#0e221c]/70">
                                Having trouble loading the calendar? Try disabling any ad-blocker
                                or use the “Open scheduling in a new tab” link above.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
}
