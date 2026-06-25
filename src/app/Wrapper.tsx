"use client";

import Footer from "@/components/Footer";

interface Props {
    children: React.ReactNode;
    className?: string;
}

export default function Wrapper({ children }: Props) {
    return (
        <>
            {children}
            <Footer />
        </>
    );
}
