"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function ParallaxImage({
    src,
    alt,
    speed = 50, // bigger = more parallax
    className = "",
}: {
    src: string;
    alt: string;
    speed?: number;
    className?: string;
}) {
    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"], // when element enters/leaves viewport
    });

    // Moves image up/down while scrolling
    const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);

    return (
        <div ref={ref} className={`relative overflow-hidden ${className}`}>
            <motion.img
                src={src}
                alt={alt}
                style={{ y }}
                className="h-full w-full object-cover will-change-transform"
            />
        </div>
    );
}
