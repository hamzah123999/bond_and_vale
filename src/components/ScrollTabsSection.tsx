"use client";

import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, Mousewheel } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

/* ================= STATIC DATA ================= */

const tabs = [
    {
        title: "PAY ON SUCCESS MODEL",
        body:
            "OUR PAY-ON-SUCCESS MODEL REDEFINES VALUE IN COMMUNICATIONS. NO UPFRONT FEES, NO COMMITMENT AND NO RETAINERS. THIS TRANSPARENT, RESULTS-DRIVEN APPROACH REFLECTS OUR ACCOUNTABILITY, INTEGRITY, AND COMMITMENT TO MEASURABLE SUCCESS THAT STRENGTHENS EVERY PARTNERSHIP.",
        image: "/img18.jpg",
        video: "https://res.cloudinary.com/dpkp4hymz/video/upload/v1766627767/1_aazqv1.webm",
    },
    {
        title: "TRANSPARENCY & TRUST",
        body:
            "WE OPERATE WITH TRANSPARENCY. EVERY STRATEGY, MILESTONE AND METRIC IS SHARED OPENLY. THROUGH DATA-LED COMMUNICATION AND HONEST COLLABORATION, WE BUILD THE TRUST AND CREDIBILITY THAT DEFINE LASTING CLIENT RELATIONSHIPS.",
        image: "/img19.jpg",
        video: "https://res.cloudinary.com/dpkp4hymz/video/upload/v1766627812/3_ypaw6r.webm",
    },
    {
        title: "NETWORK AND INFLUENCE",
        body:
            "WITH A GLOBAL NETWORK OF MEDIA, INVESTORS AND INDUSTRY LEADERS, WE HELP BRANDS AMPLIFY AUTHORITY AND REDEFINE INFLUENCE. OUR RELATIONSHIPS AND STRATEGIC STORYTELLING TURN REPUTATION INTO MEASURABLE VISIBILITY AND INFLUENCE THAT ENDURES.",
        image: "/img20.jpg",
        video: "https://res.cloudinary.com/dpkp4hymz/video/upload/v1766627775/2_wmylkg.webm",
    },
];

/* ================= MAIN COMPONENT ================= */

export default function ScrollSnapTabs() {
    return (
        <section className="bg-[#e6d7c4] text-[#23352d]">
            <Swiper
                slidesPerView={1}
                speed={900}
                pagination={{ clickable: true }}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                mousewheel={{ forceToAxis: true }}
                modules={[Navigation, Pagination, Autoplay, Mousewheel]}
                className="w-full"
            >
                {tabs.map((tab, i) => (
                    <SwiperSlide key={i}>
                        <ContentRow
                            title={tab.title}
                            body={tab.body}
                            image={tab.image}
                            video={tab.video}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}

/* ================= CONTENT ROW ================= */

function ContentRow({
    title,
    body,
    image,
    video,
}: {
    title: string;
    body: string;
    image: string;
    video: string;
}) {
    return (
        <div className="max-w-[1400px] mx-auto px-6 lg:px-14 md:py-20 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* TEXT */}
            <div >
                <h2 className="font-[PPPangaia] uppercase leading-[1.2] tracking-wide text-[clamp(2rem,6vw,3.5rem)]">
                    {title}
                </h2>

                <p className="mt-4 max-w-xl text-[clamp(13px,1vw,16px)] uppercase tracking-wider leading-7 opacity-80">
                    {body}
                </p>
            </div>

            {/* MEDIA */}
            <div>
                <HoverVideo image={image} video={video} />
            </div>
        </div>
    );
}

/* ================= HOVER VIDEO ================= */

function HoverVideo({
    image,
    video,
}: {
    image: string;
    video: string;
}) {
    const videoRef = useRef<HTMLVideoElement | null>(null);

    const onEnter = () => {
        if (videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.play().catch(() => { });
        }
    };

    const onLeave = () => {
        if (videoRef.current) {
            videoRef.current.pause();
        }
    };

    return (
        <div
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
            className="relative h-[320px] lg:h-[420px] rounded-lg overflow-hidden border border-black/15 bg-white/10 group"
        >
            {/* IMAGE */}
            <Image
                fill
                src={image}
                alt="media"
                className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300 group-hover:opacity-0"
                loading="lazy"
            />

            {/* VIDEO */}
            <video
                ref={videoRef}
                muted
                loop
                playsInline
                preload="metadata"
                className="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
                <source src={video} type="video/webm" />
                Your browser does not support the video tag.
            </video>

        </div>
    );
}
