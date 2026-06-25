"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function killScrollTriggers() {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
}

/**
 * GSAP SplitText + ScrollTrigger mutate the DOM. On Next.js client navigations
 * (especially leaving the homepage), React can unmount nodes while GSAP still
 * owns them — causing insertBefore/removeChild crashes. Kill triggers on route change.
 */
export default function GsapRouteCleanup() {
    const pathname = usePathname();

    useLayoutEffect(() => {
        return () => {
            killScrollTriggers();
        };
    }, [pathname]);

    return null;
}
