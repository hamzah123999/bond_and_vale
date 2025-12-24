import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    if (pathname.startsWith("/dashboard")) {
        // ✅ more flexible: check any cookie name containing "auth" or "session"
        const cookieNames = req.cookies.getAll().map((c) => c.name);

        const hasSession = cookieNames.some(
            (name) =>
                name.toLowerCase().includes("auth") ||
                name.toLowerCase().includes("session") ||
                name.toLowerCase().includes("better")
        );

        if (!hasSession) {
            const url = req.nextUrl.clone();
            url.pathname = "/login";
            url.searchParams.set("next", pathname);
            return NextResponse.redirect(url);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*"],
};
