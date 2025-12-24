"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

type ServiceCardProps = {
    href?: string;
    title: string;
    tag?: string; // like "Realisation" in your ref
    description?: string; // small right text
    imageSrc: string;
    videoSrc: string;
};

export default function ServiceCard({
    href = "/services",
    title,
    tag = "Service",
    description = "Discover more about this service.",
    imageSrc,
    videoSrc,
}: ServiceCardProps) {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [hovered, setHovered] = useState(false);

    const onEnter = async () => {
        setHovered(true);
        const v = videoRef.current;
        if (!v) return;
        try {
            v.currentTime = 0;
            await v.play();
        } catch {
            // autoplay might fail in some browsers if not muted (we mute below)
        }
    };

    const onLeave = () => {
        setHovered(false);
        const v = videoRef.current;
        if (!v) return;
        v.pause();
        v.currentTime = 0;
    };

    return (
        <Link
            href={`/services/${href}`}
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
            onFocus={onEnter}
            onBlur={onLeave}
            data-aos="fade-up"
            className="group block border border-black/25 bg-transparent"
        >
            {/* Media */}
            <div className="relative aspect-[4/3] w-full overflow-hidden" >
                <Image
                    fill
                    src={imageSrc}
                    alt={title}
                    className={[
                        "absolute inset-0 h-full w-full object-cover transition-opacity duration-500",
                        hovered ? "opacity-0" : "opacity-100",
                    ].join(" ")}
                    loading="lazy"
                />

                {/* Video (on hover) */}
                <video
                    ref={videoRef}
                    className={[
                        "absolute inset-0 h-full w-full object-cover transition-opacity duration-500",
                        hovered ? "opacity-100" : "opacity-0",
                    ].join(" ")}
                    src={videoSrc}
                    muted
                    playsInline
                    loop
                    preload="metadata"
                />

                {/* subtle overlay (matches your vibe) */}
                <div className="pointer-events-none absolute inset-0 bg-black/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>

            {/* Bottom info bar (like your second image) */}
            <div className="grid grid-cols-[1.2fr_1fr] gap-6 px-6 py-6 bg-[#e6d7c4]">
                <div>
                    <div className="text-[#23352d]/85 font-serif text-[clamp(18px,1.3vw,22px)] leading-[1.1]">
                        {title}
                    </div>
                </div>

                <div className="text-right">
                    <div className="text-[#23352d]/60 text-sm mb-2">{tag}</div>
                    <div className="text-[#23352d]/65 text-[13px] leading-5">
                        {description}
                    </div>
                </div>
            </div>
        </Link>
    );
}
