import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact",
    description:
        "Get in touch with Bond & Vale for strategic PR, brand consultancy, and communications support. Let's build your narrative together.",
    alternates: {
        canonical: "/contact",
    },
    openGraph: {
        title: "Contact | Bond & Vale",
        description:
            "Get in touch with Bond & Vale for strategic PR, brand consultancy, and communications support.",
        url: "/contact",
    },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return children;
}
