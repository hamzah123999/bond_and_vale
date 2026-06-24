"use client";

import { useLayoutEffect } from "react";

const ANIM_MS = 1000;
const UNLOCK_MS = 1900;
const STATIC_LOADER_ID = "initial-site-loader";

function lockScroll() {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
}

function unlockScroll() {
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
}

function createLoaderElement() {
    const overlay = document.createElement("div");
    overlay.id = "client-site-loader";
    overlay.setAttribute("aria-hidden", "true");
    overlay.className =
        "fixed inset-0 z-[99999] flex items-center justify-center bg-[#0e221c] tabloader";

    const img = document.createElement("img");
    img.src = "/loaderlogo.svg";
    img.alt = "";
    img.width = 420;
    img.height = 120;
    img.className = "w-[260px] sm:w-[360px] h-auto px-6";
    img.decoding = "sync";

    overlay.appendChild(img);
    document.body.appendChild(overlay);
    return overlay;
}

export default function TabLoader() {
    useLayoutEffect(() => {
        const staticLoader = document.getElementById(STATIC_LOADER_ID);
        const overlay = staticLoader ?? createLoaderElement();

        lockScroll();

        const t1 = window.setTimeout(() => {
            overlay.classList.add("tabloader-hide");
        }, ANIM_MS);

        const t2 = window.setTimeout(() => {
            overlay.remove();
            unlockScroll();
        }, UNLOCK_MS);

        return () => {
            window.clearTimeout(t1);
            window.clearTimeout(t2);
            if (overlay.isConnected) {
                overlay.remove();
            }
            unlockScroll();
        };
    }, []);

    return null;
}
