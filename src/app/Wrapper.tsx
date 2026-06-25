"use client";

import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";

interface Props {
    children: React.ReactNode;
    className?: string;
}

export default function Wrapper({ children }: Props) {
    const pathname = usePathname();

    return (
        <>
            {children}
            <Footer key={pathname} />
        </>
    );
}
