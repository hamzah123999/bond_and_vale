"use client";

import { useEffect } from "react";

/**
 * GSAP SplitText rewrites DOM nodes that React also owns. Next.js client-side
 * navigation from the homepage leaves both fighting over the same nodes and the
 * app white-screens. Full page loads avoid that entirely.
 */
export default function GsapRouteCleanup() {
    useEffect(() => {
        const onClickCapture = (event: MouseEvent) => {
            if (event.defaultPrevented) return;
            if (event.button !== 0) return;
            if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

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

            event.preventDefault();
            event.stopImmediatePropagation();
            window.location.assign(url.href);
        };

        document.addEventListener("click", onClickCapture, true);
        return () => document.removeEventListener("click", onClickCapture, true);
    }, []);

    return null;
}
