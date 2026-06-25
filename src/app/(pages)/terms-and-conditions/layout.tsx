import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms and Conditions",
    description:
        "Terms of use for bondandvale.com, including how you may use Bond & Vale's website and services.",
    alternates: {
        canonical: "/terms-and-conditions",
    },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
    return children;
}
