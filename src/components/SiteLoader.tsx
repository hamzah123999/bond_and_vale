"use client";

import { useLayoutEffect } from "react";

const ANIM_MS = 1000;
const UNLOCK_MS = 1900;
const STATIC_LOADER_ID = "initial-site-loader";
const STORAGE_KEY = "bond-vale-loader-seen";

function lockScroll() {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
}

function unlockScroll() {
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
}

function dismissLoader(overlay: HTMLElement | null) {
    overlay?.remove();
    unlockScroll();
}

/**
 * Runs once from root layout — handles the intro loader on first load only.
 * Client-side navigations skip the loader so header links stay clickable.
 */
export default function SiteLoader() {
    useLayoutEffect(() => {
        const staticLoader = document.getElementById(STATIC_LOADER_ID);

        if (sessionStorage.getItem(STORAGE_KEY) === "1") {
            dismissLoader(staticLoader);
            return;
        }

        const overlay = staticLoader;
        if (!overlay) return;

        lockScroll();

        const t1 = window.setTimeout(() => {
            overlay.classList.add("tabloader-hide");
        }, ANIM_MS);

        const t2 = window.setTimeout(() => {
            sessionStorage.setItem(STORAGE_KEY, "1");
            dismissLoader(overlay);
        }, UNLOCK_MS);

        return () => {
            window.clearTimeout(t1);
            window.clearTimeout(t2);
            dismissLoader(overlay.isConnected ? overlay : null);
        };
    }, []);

    return null;
}
