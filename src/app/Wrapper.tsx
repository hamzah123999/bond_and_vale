"use client";

import { useEffect, useRef } from "react";
import ClickSpark from "@/components/ClickSpark";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import "aos/dist/aos.css";
import AOS from "aos";
import Footer from "@/components/Footer";

interface Props {
    children: React.ReactNode;
    className?: string;
}


export default function Wrapper({ children, className = "" }: Props) {

    const lenisRef = useRef<any>(null);

    useEffect(() => {
        let lenis: any;

        (async () => {
            // Only load these in the browser when needed
            const [{ default: AOS }, { default: Lenis }] = await Promise.all([
                import("aos"),
                import("lenis"),
            ]);

            await import("aos/dist/aos.css");
            await import("lenis/dist/lenis.css");

            AOS.init({ once: true, duration: 800, delay: 100 });

            if (window.innerWidth < 768) return;
            lenis = new Lenis({ autoRaf: true });
            lenisRef.current = lenis;
        })();

        return () => {
            if (lenis) lenis.destroy?.();
        };
    }, []);

    // useEffect(() => {
    //     AOS.init({ once: true, duration: 800, delay: 100 });

    //     if (window.innerWidth < 768) return; // disable on mobile

    //     const lenis = new Lenis({ autoRaf: true });
    //     lenisRef.current = lenis;

    //     return () => lenis.destroy();
    // }, []);


    return (
        <>
            <ClickSpark
                sparkColor="#4a5a52"
                sparkSize={10}
                sparkRadius={15}
                sparkCount={8}
                duration={400}
            >
                {children}
                <Footer />
            </ClickSpark>
        </>
    )
}
