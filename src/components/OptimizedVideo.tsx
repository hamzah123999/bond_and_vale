"use client";

import { useEffect, useRef, useState } from "react";
import { cloudinaryVideo } from "@/lib/cloudinary";

type OptimizedVideoProps = Omit<
    React.VideoHTMLAttributes<HTMLVideoElement>,
    "src" | "preload"
> & {
    src: string;
    width?: number;
    /** When to start fetching the video file. */
    loadWhen?: "visible" | "immediate";
};

export default function OptimizedVideo({
    src,
    width = 960,
    loadWhen = "visible",
    poster,
    className,
    autoPlay,
    muted,
    loop,
    playsInline,
    ...rest
}: OptimizedVideoProps) {
    const ref = useRef<HTMLVideoElement>(null);
    const [loadedSrc, setLoadedSrc] = useState<string | null>(
        loadWhen === "immediate" ? cloudinaryVideo(src, { width }) : null,
    );

    useEffect(() => {
        if (loadWhen === "immediate") return;

        const el = ref.current;
        if (!el) return;

        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setLoadedSrc(cloudinaryVideo(src, { width }));
                    io.disconnect();
                }
            },
            { threshold: 0.15, rootMargin: "100px" },
        );

        io.observe(el);
        return () => io.disconnect();
    }, [src, width, loadWhen]);

    useEffect(() => {
        const video = ref.current;
        if (!video || !loadedSrc || !autoPlay) return;

        void video.play().catch(() => {});
    }, [loadedSrc, autoPlay]);

    return (
        <video
            ref={ref}
            className={className}
            src={loadedSrc ?? undefined}
            poster={poster}
            autoPlay={autoPlay}
            muted={muted}
            loop={loop}
            playsInline={playsInline}
            preload="none"
            {...rest}
        />
    );
}
