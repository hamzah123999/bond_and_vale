"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        const check = async () => {
            try {
                const res = await authClient.getSession();

                const isLoggedIn = !!(res?.data?.session || res?.data?.user);

                if (!isLoggedIn) {
                    router.replace("/login");
                    return;
                }
            } catch {
                router.replace("/login");
                return;
            } finally {
                setChecking(false);
            }
        };

        check();
    }, [router]);

    if (checking) {
        return (
            <div className="min-h-screen bg-[#e6d7c4] text-[#23352d] flex items-center justify-center">
                <div className="text-sm text-[#23352d]/70">Checking session…</div>
            </div>
        );
    }

    return <>{children}</>;
}
