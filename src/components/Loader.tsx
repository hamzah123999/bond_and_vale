"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

type TabLoaderProps = {
    direction?: "top" | "bottom";
    speed?: number;
    delay?: number;
    enter?: boolean;
    minDuration?: number;
};

export default function TabLoader({
    direction = "top",
    speed = 1.4,
    delay = 0.6,
    enter = false,
    minDuration = 1800,
}: TabLoaderProps) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        if (!visible) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = prev;
        };
    }, [visible]);

    useEffect(() => {
        const timeout = Math.max(minDuration, (delay + speed) * 1000);
        const t = window.setTimeout(() => setVisible(false), timeout);
        return () => window.clearTimeout(t);
    }, [delay, speed, minDuration]);

    const fromY = direction === "top" ? "-100%" : "100%";
    const exitY = direction === "top" ? "-100%" : "100%";

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0e221c] overflow-hidden"
                    aria-label="Loading"
                    role="status"
                    initial={{ y: enter ? fromY : 0 }}
                    animate={{
                        y: 0,
                        transition: enter
                            ? { duration: speed * 0.6, ease: [0.22, 1, 0.36, 1] }
                            : undefined,
                    }}
                    exit={{
                        y: exitY,
                        transition: { duration: speed, ease: [0.22, 1, 0.36, 1] },
                    }}
                >
                    <Image
                        src="/loaderlogo.svg"
                        data-aos="zoom-out" 
                        alt="Bond & Vale"
                        width={420}
                        height={120}
                        priority
                        className="max-w-4xl w-auto h-7 px-6"
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
