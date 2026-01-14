"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function TabLoader() {
    const [hide, setHide] = useState(false);

    useEffect(() => {
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const t1 = window.setTimeout(() => setHide(true), 1000);

        const t2 = window.setTimeout(() => {
            document.body.style.overflow = prev;
        }, 1900);

        return () => {
            window.clearTimeout(t1);
            window.clearTimeout(t2);
            document.body.style.overflow = prev;
        };
    }, []);

    return (
        <div
            className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#0e221c] tabloader ${hide ? "tabloader-hide" : ""
                }`}
            role="status"
            aria-label="Loading"
        >
            <Image
                src="/loaderlogo.svg"
                alt="Loading"
                width={420}
                height={120}
                priority
                className="w-[260px] sm:w-[360px] h-auto px-6"
            />
        </div>
    );
}
