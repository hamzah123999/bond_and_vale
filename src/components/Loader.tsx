"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const LOADER_SEEN_KEY = "bond-vale-loader-seen";
const ANIM_MS = 800;
const UNLOCK_MS = 1200;

function hasSeenLoader() {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem(LOADER_SEEN_KEY) === "1";
}

export default function TabLoader() {
    const [skip] = useState(() => hasSeenLoader());
    const [hide, setHide] = useState(false);

    useEffect(() => {
        if (skip) return;

        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const t1 = window.setTimeout(() => setHide(true), ANIM_MS);

        const t2 = window.setTimeout(() => {
            document.body.style.overflow = prev;
            sessionStorage.setItem(LOADER_SEEN_KEY, "1");
        }, UNLOCK_MS);

        return () => {
            window.clearTimeout(t1);
            window.clearTimeout(t2);
            document.body.style.overflow = prev;
        };
    }, []);

    if (skip) return null;

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
