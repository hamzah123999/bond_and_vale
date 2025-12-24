"use client";

import Image from "next/image";
import Link from "next/link";
import { Instagram, Facebook, Linkedin } from "lucide-react";
import TicketButton from "@/components/TicketButton";
import { ParallaxImage } from "./ParallaxImage";
import SplitText from "./SplitText";
import DecryptedText from "./DecryptedText";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

const instaItems = [
    { src: "/img3.png", label: "Editorial" },
    { src: "/img10.jpg", label: "Workspace" },
    { src: "/img5.jpg", label: "Business" },
    { src: "/img6.jpg", label: "Strategy" },
    { src: "/img7.jpg", label: "Branding" },
    { src: "/img8.jpg", label: "Analytics" },
];


export default function Footer() {

    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSend = async () => {
        if (loading) return;

        // validation
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
            toast(
                err?.response?.data?.message ||
                err?.message ||
                "Something went wrong."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleAnimationComplete = () => {
    };
    return (
        <footer className="relative bg-[#fef2e1] text-[#0e221c] overflow-hidden">
            <div className="mx-auto max-w-[1450px] px-4 md:px-6 lg:px-14 pt-20 pb-10 md:pb-44">
                <div className="grid grid-cols-1  lg:grid-cols-2 md:gap-14 gap-8">
                    <Link className="" href={"/contact#calender"}>
                        <SplitText
                            text="Plan an introductory strategy call"
                            className="font-[PPPangaia] uppercase  !text-start leading-tight text-[clamp(2rem,5.5vw,3rem)] max-w-xl"
                            delay={150}
                            duration={2}
                            splitType="lines"
                            from={{ opacity: 0, y: 100 }}
                            onLetterAnimationComplete={handleAnimationComplete}
                        />

                    </Link>

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
                                    className="w-full bg-[#e2d3c0]/70 mt-1 px-4 py-2.5 outline-none"
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
                                    className="w-full bg-[#e2d3c0]/70 mt-1 px-4 py-2.5 outline-none"
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
                                className="w-full bg-[#e2d3c0]/70 mt-1 px-4 py-2.5 outline-none resize-none"
                                disabled={loading}
                            />
                        </div>

                        <p className="text-sm text-[#0e221c]/90 mb-5">
                            By clicking Let's Bond, you agree to our Terms and Conditions and Privacy
                            Policy
                        </p>

                        {/* Click ONLY — Enter won't submit because there is no <form> */}
                        <div
                            onClick={handleSend}
                            className={loading ? "pointer-events-none opacity-70" : ""}
                        >
                            <TicketButton
                                href="#"
                                label={loading ? "Submitting..." : "Let's Bond"}
                            />
                        </div>
                    </div>


                </div>

                <div className="md:mt-20 mt-16 ">
                    <div className="mb-4 flex items-center justify-between">
                        <div className="text-sm tracking-wide text-[#4a5346]">
                            Instagram Highlights
                        </div>

                        <div className="flex md:gap-4 gap-2">
                            {[
                                { href: "https://www.instagram.com/bondandvale", Icon: Instagram, label: "Instagram" },
                                { href: "https://www.facebook.com/share/1BS1H9f9mn/?mibextid=wwXIfr", Icon: Facebook, label: "Facebook" },
                                { href: "https://www.linkedin.com/company/bond-vale", Icon: Linkedin, label: "LinkedIn" },
                            ].map(({ href, Icon, label }) => (
                                <Link
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="md:h-11 h-10 w-10 md:w-11 flex items-center justify-center rounded-full border border-black/30 text-[#0e221c]/70 hover:text-[#0e221c]"
                                >
                                    <Icon size={18} />
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 md:gap-4 gap-2">
                        {instaItems.map((item, i) => (
                            <div
                                key={i}
                                className="group relative h-32 overflow-hidden"
                            >
                                <ParallaxImage
                                    src={item.src}
                                    alt={item.label}
                                    className="object-cover md:block hidden"
                                />

                                <Image
                                    width={500}
                                    height={500}
                                    src={item.src}
                                    alt={item.label}
                                    className="object-cover h-full md:hidden "
                                />

                                <div className="absolute inset-0 flex items-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <span className="text-sm text-white drop-shadow">
                                        {item.label}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6 items-center text-sm text-[#4a5346]">
                    <p className="md:block hidden">Portfolio</p>

                    <div className="flex md:justify-center justify-between gap-6">
                        <Link href="/terms-and-conditions" className="underline">
                            <DecryptedText text="Terms and Conditions" className="text-[#0e221c] underline " useOriginalCharsOnly animateOn="hover" parentClassName="text-[#0e221c] cursor-pointer underline    " speed={50} />
                        </Link>
                        <Link href="/privacy-policy" className="underline">
                            <DecryptedText text="Privacy Policy" className="text-[#0e221c] underline " useOriginalCharsOnly
                                animateOn="hover" parentClassName="text-[#0e221c] cursor-pointer underline  " speed={50} />
                        </Link>
                    </div>

                    <div className="flex justify-end md:flex-row flex-col text-center md:text-start gap-6">
                        <span>© 2025 Bond & Value. All rights reserved</span>
                        <span className="underline md:block hidden">Website by Quzex</span>
                    </div>
                </div>

            </div>

            <HalfCutBrandText text="Bond & Value" />
        </footer>
    );
}


function HalfCutBrandText({ text = "Bond & Vale" }: { text?: string }) {
    return (
        <div className="pointer-events-none md:block hidden absolute bottom-0 left-0 w-full">
            {/* this is the “window” that only shows half */}
            <div className="h-[9vw] sm:min-h-[80px] min-h-[20px] max-h-[180px] overflow-hidden">
                <div
                    className="flex justify-center"
                >
                    <Image
                        src="/door.svg"
                        alt="Bond & Vale logo"
                        width={2000}
                        height={1200}
                        className="w-full h-auto object-contain select-none"
                        priority
                    />
                    {/* <span
                        className="
              whitespace-nowrap
              font-serif
              leading-none
              tracking-tight
              text-[#0e221c]
              sm:text-[17vw]
              text-[16vw]
            "
                    >
                        Bond & Vale
                    </span> */}
                </div>
            </div>
        </div>
    );
}
