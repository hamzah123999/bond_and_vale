"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Wrapper from "@/app/Wrapper";
import Header from "@/components/Header";
import { ArrowRight, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import TabLoader from "@/components/Loader";

export default function AdminLoginPage() {
    const router = useRouter();

    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(true);

    // ✅ NEW: auth state
    const [checkingSession, setCheckingSession] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // ✅ Check if already logged in
    useEffect(() => {
        const checkSession = async () => {
            try {
                const res = await authClient.getSession();
                const loggedIn = !!(res?.data?.session || res?.data?.user);
                setIsAuthenticated(loggedIn);
            } catch {
                setIsAuthenticated(false);
            } finally {
                setCheckingSession(false);
            }
        };

        checkSession();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (loading) return;

        setLoading(true);
        try {
            const callbackURL = `${window.location.origin}/dashboard`;

            const { error } = await authClient.signIn.email({
                email,
                password,
                rememberMe,
                callbackURL,
            });

            if (error) {
                alert(error.message || "Invalid email or password.");
                setLoading(false);
                return;
            }

            router.replace("/dashboard");
        } catch (err: any) {
            alert(err?.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // ✅ Prevent UI flash while checking session
    if (checkingSession) {
        return (
            <Wrapper>
                <main className="min-h-screen bg-[#e6d7c4] flex items-center justify-center">
                    <p className="text-sm text-[#0e221c]/70">Checking session…</p>
                </main>
            </Wrapper>
        );
    }

    return (
        <Wrapper>
            <TabLoader direction="top" speed={1.4} minDuration={2000} />
            <main className="min-h-screen bg-[#e6d7c4] text-[#0e221c]">
                <Header />

                <section className="mx-auto max-w-[1450px] px-4 lg:px-14 pt-14 lg:pt-20 pb-20">
                    <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start">

                        {/* LEFT */}
                        <div className="pt-6">
                            <div className="text-xs uppercase tracking-[0.22em] text-[#0e221c]/60">
                                Admin Access
                            </div>

                            <h1 className="mt-5 font-[PPPangaia] uppercase leading-[0.92] tracking-wide text-[clamp(2.2rem,4.8vw,3.8rem)]">
                                Admin Panel
                            </h1>

                            <p className="mt-5 max-w-xl text-[#0e221c]/75 leading-7">
                                This area is restricted. Authorized users only.
                            </p>
                        </div>

                        {/* RIGHT */}
                        <div className="border border-black/10 bg-white/10">
                            <div className="p-6 sm:p-8">

                                {/* ✅ IF ALREADY LOGGED IN */}
                                {isAuthenticated ? (
                                    <>
                                        <div className="text-xs uppercase tracking-[0.22em] text-[#0e221c]/60">
                                            Already signed in
                                        </div>

                                        <h2 className="mt-4 font-serif text-2xl">
                                            You’re already logged in
                                        </h2>

                                        <p className="mt-4 text-sm text-[#0e221c]/70 leading-6">
                                            You are currently signed in.
                                            If you want to switch accounts, please log out from the dashboard first.
                                        </p>

                                        <div className="mt-8 flex flex-col gap-3">
                                            <button
                                                onClick={() => router.push("/dashboard")}
                                                className="inline-flex items-center justify-center gap-3 rounded-full bg-[#3f4b3f] px-6 py-3 text-sm text-[#e6d7c4] hover:opacity-90"
                                            >
                                                Go to Dashboard
                                                <ArrowRight className="h-4 w-4" />
                                            </button>

                                            <Link
                                                href="/"
                                                className="text-center text-sm uppercase tracking-widest text-[#0e221c]/60 hover:text-[#0e221c]"
                                            >
                                                Back to site
                                            </Link>
                                        </div>
                                    </>
                                ) : (
                                    /* ✅ NORMAL LOGIN FORM */
                                    <>
                                        <div className="text-xs uppercase tracking-[0.22em] text-[#0e221c]/60">
                                            Login
                                        </div>

                                        <h2 className="mt-3 font-serif text-2xl leading-tight">
                                            Admin Credentials
                                        </h2>

                                        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                                            {/* Email */}
                                            <div>
                                                <label className="block text-[10px] uppercase tracking-[0.22em] text-[#0e221c]/60">
                                                    Email
                                                </label>
                                                <div className="mt-2 flex items-center gap-3 border border-black/10 bg-white/20 px-4 py-3">
                                                    <Mail className="h-4 w-4 text-[#0e221c]/60" />
                                                    <input
                                                        type="email"
                                                        required
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        className="w-full bg-transparent outline-none"
                                                        placeholder="Enter your email address"
                                                    />
                                                </div>
                                            </div>

                                            {/* Password */}
                                            <div>
                                                <label className="block text-[10px] uppercase tracking-[0.22em] text-[#0e221c]/60">
                                                    Password
                                                </label>
                                                <div className="mt-2 flex items-center gap-3 border border-black/10 bg-white/20 px-4 py-3">
                                                    <Lock className="h-4 w-4 text-[#0e221c]/60" />
                                                    <input
                                                        type={showPass ? "text" : "password"}
                                                        required
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        placeholder="Enter your password"
                                                        className="w-full bg-transparent outline-none"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowPass(!showPass)}
                                                    >
                                                        {showPass ? <EyeOff /> : <Eye />}
                                                    </button>
                                                </div>
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={loading}
                                                className="mt-2 inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#3f4b3f] px-6 py-3 text-sm text-[#e6d7c4]"
                                            >
                                                {loading ? "Signing in..." : "Sign In"}
                                                <ArrowRight className="h-4 w-4" />
                                            </button>
                                        </form>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </Wrapper>
    );
}
