"use client";

import TicketButton from "@/components/TicketButton";
import SplitText from "@/components/SplitText";
import Header from "@/components/Header";
import { useEffect, useMemo, useRef, useState } from "react";

export default function HeroClient() {
    const heroRef = useRef<HTMLElement | null>(null);
    const holderRef = useRef<HTMLDivElement | null>(null);

    const [isDesktop, setIsDesktop] = useState<boolean | null>(null);
    const [shouldLoad, setShouldLoad] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    // Detect desktop/mobile
    useEffect(() => {
        const mq = window.matchMedia("(min-width: 768px)");
        const update = () => setIsDesktop(mq.matches);
        update();
        mq.addEventListener("change", update);
        return () => mq.removeEventListener("change", update);
    }, []);

    // Lazy-load video when hero is in view
    useEffect(() => {
        const el = heroRef.current;
        if (!el) return;

        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShouldLoad(true);
                    io.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        io.observe(el);
        return () => io.disconnect();
    }, []);

    // Your 10s fade logic (optional — but this doesn’t break hooks now)
    useEffect(() => {
        const t = window.setTimeout(() => setIsVisible(false), 10000);
        return () => window.clearTimeout(t);
    }, []);

    const videoSrc = useMemo(() => {
        if (isDesktop === true)
            return "https://res.cloudinary.com/dpkp4hymz/video/upload/f_auto,q_auto,w_1280/v1768445682/videobg_d0ta23_1_goxitj.mp4";
        if (isDesktop === false)
            return "https://res.cloudinary.com/dpkp4hymz/video/upload/f_auto,q_auto,w_720/v1768445684/mobile_ttipba_1_b0fiko.mp4";
        return null; // unknown on first render
    }, [isDesktop]);

    return (
        <div className="relative">
            {/* Background container */}
            <div ref={holderRef} className="absolute inset-0">
                {/* Poster always visible immediately */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url(/img2.jpg)" }}
                />

                {/* Video always present, but source is injected only when ready */}
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="none"
                    poster="/img2.jpg"
                    className="absolute inset-0 h-full w-full object-cover"
                >
                    {shouldLoad && videoSrc && <source src={videoSrc} type="video/mp4" />}
                </video>
            </div>

            <div className="absolute inset-0 bg-black/50" />
            <Header />

            <section
                ref={heroRef}
                className="relative h-[calc(100vh-6rem)] w-full flex items-center justify-center overflow-hidden"
            >
                <div className="relative z-[2] flex md:h-full w-full flex-col">
                    <div className="flex flex-1 items-start justify-center px-4 pb-20 md:pb-0 md:pt-32">
                        <h1
                            className={`text-center font-[PPPangaia] uppercase leading-[0.95] transition-all duration-300 tracking-wide text-[#e6d7c4] drop-shadow-[0_2px_20px_rgba(0,0,0,0.35)] ${!isVisible ? "opacity-0" : ""
                                }`}
                        >
                            <span className="block max-w-4xl leading-tight mx-auto text-center">
                                <SplitText
                                    text="Pay On Success. Communication that connects."
                                    className="text-[40px] sm:text-[70px] md:text-8xl text-center"
                                    delay={300}
                                    duration={2}
                                    splitType="lines"
                                    from={{ opacity: 0, y: 100 }}
                                    onLetterAnimationComplete={() => { }}
                                />
                            </span>
                        </h1>
                    </div>

                    <div className="md:relative md:flex z-[3] hidden items-end absolute bottom-5 justify-between md:px-6 px-3 lg:px-10">
                        <TicketButton href="/contact" label="Contact" />
                        <TicketButton href="/services" label="Services" />
                    </div>
                </div>

                <div className="md:hidden z-[3] flex items-end gap-5 absolute bottom-0 justify-between px-3 pb-6 lg:px-10">
                    <TicketButton href="/contact" label="Contact" />
                    <TicketButton href="/services" label="Services" />
                </div>
            </section>
        </div>
    );
}
