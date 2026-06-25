"use client";

import { useEffect, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type SplitElement = HTMLElement & {
    _rbsplitInstance?: { revert?: () => void } | null;
};

function revertAllSplitText() {
    document.querySelectorAll(".split-parent").forEach((node) => {
        const el = node as SplitElement;
        if (!el._rbsplitInstance?.revert || !el.isConnected) return;
        try {
            el._rbsplitInstance.revert();
        } catch {
            /* React may already be updating this subtree */
        }
        el._rbsplitInstance = null;
    });
}

function tearDownGsapAnimations() {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    revertAllSplitText();
    gsap.killTweensOf(".split-parent, .split-char, .split-word, .split-line");
}

/**
 * GSAP SplitText mutates DOM nodes that React also manages. On client-side
 * navigations (especially leaving the homepage) that causes insertBefore crashes.
 * Tear down GSAP on internal link clicks (capture phase) and on route changes.
 */
export default function GsapRouteCleanup() {
    const pathname = usePathname();

    useLayoutEffect(() => {
        tearDownGsapAnimations();
        return () => {
            tearDownGsapAnimations();
        };
    }, [pathname]);

    useEffect(() => {
        const onClickCapture = (event: MouseEvent) => {
            const target = event.target;
            if (!(target instanceof Element)) return;

            const anchor = target.closest("a[href]") as HTMLAnchorElement | null;
            if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) {
                return;
            }

            const href = anchor.getAttribute("href");
            if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
                return;
            }

            let url: URL;
            try {
                url = new URL(anchor.href, window.location.origin);
            } catch {
                return;
            }

            if (url.origin !== window.location.origin) return;
            if (url.pathname === window.location.pathname && url.hash === window.location.hash) {
                return;
            }

            tearDownGsapAnimations();
        };

        document.addEventListener("click", onClickCapture, true);
        return () => document.removeEventListener("click", onClickCapture, true);
    }, []);

    return null;
}
