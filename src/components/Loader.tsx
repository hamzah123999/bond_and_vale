"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type TabLoaderProps = {
    direction?: "top" | "bottom";
    speed?: number;         // seconds for exit animation
    minDuration?: number;   // ms
    enter?: boolean;
    onDone?: () => void;
};

export default function TabLoader({
    direction = "top",
    speed = 0.8,
    minDuration = 600,
    enter = false,
    onDone,
}: TabLoaderProps) {
    const reduceMotion = useReducedMotion();

    const [visible, setVisible] = useState(true);
    const startRef = useRef<number>(0);
    const hideTimerRef = useRef<number | null>(null);

    const fromY = direction === "top" ? "-100%" : "100%";
    const exitY = fromY;

    // Hide when the browser is ready (interactive) + after minDuration.
    useEffect(() => {
        startRef.current = performance.now();

        const requestHide = () => {
            const elapsed = performance.now() - startRef.current;
            const remaining = Math.max(0, minDuration - elapsed);

            if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
            hideTimerRef.current = window.setTimeout(() => {
                setVisible(false);
            }, remaining);
        };

        // If already interactive, hide soon.
        if (document.readyState === "interactive" || document.readyState === "complete") {
            requestHide();
        } else {
            // Wait until DOM is ready enough, then hide.
            window.addEventListener("DOMContentLoaded", requestHide, { once: true });
            window.addEventListener("load", requestHide, { once: true });
        }

        return () => {
            if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
            window.removeEventListener("DOMContentLoaded", requestHide);
            window.removeEventListener("load", requestHide);
        };
    }, [minDuration]);

    // Lock scrolling only while visible
    useEffect(() => {
        if (!visible) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = prev;
        };
    }, [visible]);

    return (
        <AnimatePresence
            onExitComplete={() => {
                onDone?.();
            }}
        >
            {visible && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0e221c]"
                    aria-label="Loading"
                    role="status"
                    initial={reduceMotion ? false : { y: enter ? fromY : 0 }}
                    animate={reduceMotion ? undefined : { y: 0 }}
                    exit={
                        reduceMotion
                            ? { opacity: 0, transition: { duration: 0.12 } }
                            : { y: exitY, transition: { duration: speed, ease: [0.22, 1, 0.36, 1] } }
                    }
                >
                    {/* Loader should NOT depend on AOS */}
                    <Image
                        src="/loaderlogo.svg"
                        alt="Bond & Vale"
                        width={420}
                        height={120}
                        priority
                        className="w-[260px] sm:w-[360px] h-auto px-6"
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
