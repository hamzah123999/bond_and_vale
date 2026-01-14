"use client";

import { useEffect, useRef } from "react";
// import ClickSpark from "@/components/ClickSpark";
import "aos/dist/aos.css";
import AOS from "aos";
import Footer from "@/components/Footer";

interface Props {
    children: React.ReactNode;
    className?: string;
}

export default function Wrapper({ children }: Props) {

    useEffect(() => {
        AOS.init({ once: true, duration: 800, delay: 100 });
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
