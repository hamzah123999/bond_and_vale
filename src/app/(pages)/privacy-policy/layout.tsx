import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy",
    description:
        "Read how Bond & Vale collects, uses, and protects your personal information when you use bondandvale.com or contact us.",
    alternates: {
        canonical: "/privacy-policy",
    },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
    return children;
}
