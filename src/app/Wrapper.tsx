"use client";

import { useEffect, useRef } from "react";
// import ClickSpark from "@/components/ClickSpark";
import Footer from "@/components/Footer";

interface Props {
    children: React.ReactNode;
    className?: string;
}

export default function Wrapper({ children }: Props) {
    // const lenisRef = useRef<any>(null);

    useEffect(() => {
        // let lenis: any;

        (async () => {
            const [{ default: AOS }
                // , { default: Lenis }
            ] = await Promise.all([
                import("aos"),
                // import("lenis"),
            ]);

    AOS.init({ once: true, duration: 800, delay: 100 });

            // if (window.innerWidth < 768) return;
            // lenis = new Lenis({ autoRaf: true });
            // lenisRef.current = lenis;
        })();

        // return () => {
        //     lenis?.destroy?.();
        // };
    }, []);

    return (
        <>
            {/* <ClickSpark sparkColor="#4a5a52" sparkSize={10} sparkRadius={15} sparkCount={8} duration={400}>
            </ClickSpark> */}
            {children}
            <Footer />
        </>
    );
}
