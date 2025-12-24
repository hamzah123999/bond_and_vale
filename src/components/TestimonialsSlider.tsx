"use client";

import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import SplitText from "./SplitText";

type Testimonial = {
    name: string;
    headline: string;
    body: string;
};

const testimonials = [
    {
        name: "Bryan Woods",
        headline: "Bond & Vale - legit and effective",
        body: "Bond & Vale did what they said they would do and placed us in three notable publications. We noticed a quadrupling of subscribers on YouTube and an immediate increase of traffic on LinkedIn. The pay-on-success model is a great mechanism to create business trust. Our only suggestion would be to accept a stablecoin like Tether (USDT) and/or other cryptos for payment, as we had some difficulty paying through the traditional financial system.",
    },
    {
        name: "Everett Aldrich",
        headline: "Highly effective and collaborative team",
        body: "Highly effective and collaborative team. They delivered on their promise to enhance our digital presence. Their brand consultancy has provided us with valuable insights and our PR coverage has improved dramatically."
    },
    {
        name: "Andre Finley",
        headline: "The best decision we ever made",
        body: "Handing over our social media to Bond and Vale was the best decision we ever made. They understood our brand voice immediately and created engaging content that truly connected with our audience. I have worked with so many social media agencies. These guys just went the extra mile.",
    },
    {
        name: "Lawrence Klein",
        headline: "They provided me with clear, actionable insights",
        body: "They provided me with clear, actionable insights that reshaped our brand strategy. I struggled the better half of last year with sales. I booked in with Alison for a free consultation call and she sat down with me and went through all the flaws my business had. She made it seem simple. 6 months later and a strategy in place. I have a completely new brand identity and sales have never been better. Thanks a lot!",
    },
    {
        name: "Nina Fuller",
        headline: "Currently on my 2nd article",
        body: "Currently on my 2nd article. I don't usually post reviews but I have seen such a massive increase in website traffic with so many people saying they like my article.",
    },
];

export default function TestimonialsSlider({
    label = "Testimonials",
    title = "WHAT CLIENT SAYS\nABOUT BOND & VALE",
    subtitle = `Discover how our strategic PR and marketing solutions have transformed brands\nworldwide. Hear from our satisfied clients!`,    
    className = "",
}: {
    label?: string;
    title?: string;
    subtitle?: string;
    className?: string;
}) {
    const swiperRef = useRef<SwiperType | null>(null);
    const [active, setActive] = useState(0);

    const handleAnimationComplete = () => {
    };

    return (
        <section className={["bg-[#e6d7c4] text-[#0e221c]", className].join(" ")}>
            <div className="mx-auto max-w-[1450px]  lg:px-14 py-14 lg:py-24">
                <div className="flex items-center px-4 justify-center gap-4">
                    <span className="h-[1px] w-10 bg-black/20" />
                    <span className="rounded-full border border-black/15 bg-black/5 px-4 py-1 text-xs tracking-widest">
                        {label}
                    </span>
                    <span className="h-[1px] w-10 bg-black/20" />
                </div>

                <div className="mt-8 text-center px-4">
                    <h2 className="max-w-3xl mx-auto">
                        <SplitText
                            text={title}
                            className="font-[PPPangaia] uppercase leading-[1] md:leading-[1.2] tracking-wide text-[clamp(2.2rem,5vw,3.5rem)] whitespace-pre-line"
                            delay={150}
                            duration={2}
                            splitType="lines"
                            from={{ opacity: 0, y: 100 }}
                            onLetterAnimationComplete={handleAnimationComplete}
                        />
                    </h2>
                    <p data-aos="fade-up" className="mx-auto  mt-6 max-w-2xl text-[clamp(0.9rem,1.2vw,1rem)] text-[#0e221c]/70 leading-7 whitespace-pre-line">
                        {subtitle}
                    </p>
                </div>

                <div className="mt-12 lg:mt-16" data-aos="fade -up">
                    <Swiper
                        onSwiper={(s) => (swiperRef.current = s)}
                        onSlideChange={(s) => setActive(s.realIndex)}
                        loop
                        centeredSlides
                        slidesPerView={1.08}
                        spaceBetween={16}
                        speed={900} 
                        breakpoints={{
                            768: { slidesPerView: 1.6, spaceBetween: 5 },
                            1024: { slidesPerView: 2.2, spaceBetween: 10 },
                            1280: { slidesPerView: 2.3, spaceBetween: 15 },
                        }}
                        className="!overflow-visible  [&_.swiper-wrapper]:items-center
             [&_.swiper-slide]:h-auto
             [&_.swiper-slide]:flex
             [&_.swiper-slide]:items-center"
                    >
                        {testimonials.map((t, idx) => (
                            <SwiperSlide key={idx}>
                                {({ isActive }) => (
                                    <div
                                        className={[
                                            "transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)]",
                                            isActive ? "scale-100 opacity-100" : "scale-[0.92] opacity-80",
                                        ].join(" ")}
                                    >
                                        <Card t={t} />
                                    </div>
                                )}
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <div className="mt-10 flex items-center justify-center gap-5">
                        <button
                            type="button"
                            aria-label="Previous"
                            onClick={() => swiperRef.current?.slidePrev()}
                            className="group inline-flex h-12 w-12 items-center justify-center rounded-full border border-black/25 bg-transparent text-[#0e221c] transition hover:bg-black/5"
                        >
                            <span className="text-xl transition group-hover:-translate-x-[1px]">←</span>
                        </button>

                        <button
                            type="button"
                            aria-label="Next"
                            onClick={() => swiperRef.current?.slideNext()}
                            className="group inline-flex h-12 w-12 items-center justify-center rounded-full border border-black/25 bg-[#0e221c] text-[#e6d7c4] transition hover:bg-[#1b2a24]"
                        >
                            <span className="text-xl transition group-hover:translate-x-[1px]">→</span>
                        </button>
                    </div>

                    {/* small dots (optional, clean) */}
                    {/* <div className="mt-5 flex justify-center gap-2">
                        {testimonials.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => swiperRef.current?.slideToLoop(i)}
                                className={[
                                    "h-2 w-2 rounded-full transition",
                                    i === active ? "bg-[#0e221c]" : "bg-black/20 hover:bg-black/30",
                                ].join(" ")}
                                aria-label={`Go to testimonial ${i + 1}`}
                            />
                        ))}
                    </div> */}
                </div>
            </div>
        </section>
    );
}

function Card({ t }: { t: Testimonial }) {
    return (
        <div className="relative border border-black/15 bg-[#24352f] text-[#e6d7c4] shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
            <div className="p-6 sm:p-8 lg:p-10">
                <div className="flex items-start justify-between gap-6">
                    <div className="text-sm font-semibold">{t.name}</div>
                    <div className="text-4xl leading-none opacity-90 select-none">”</div>
                </div>

                <div className="mt-6 border-t border-white/10 pt-6">
                    <div className="text-[clamp(1.05rem,1.4vw,1.25rem)] font-semibold">
                        {t.headline}
                    </div>
                    <p className="mt-4 text-[clamp(0.92rem,1.1vw,1rem)] leading-7 text-[#e6d7c4]/85">
                        {t.body}
                    </p>
                </div>
            </div>

            {/* subtle sheen */}
            <div className="pointer-events-none absolute inset-0 opacity-[0.08] bg-[radial-gradient(800px_circle_at_30%_0%,#fff,transparent_55%)]" />
        </div>
    );
}
