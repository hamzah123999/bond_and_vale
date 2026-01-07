import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Bond & Vale | Strategic PR & Communications Consultancy",
    template: "%s | Bond & Vale",
  },
  description:
    "Bond & Vale is an integrated communications consultancy helping brands grow with purpose, credibility, and trust through strategic PR, brand positioning, reputation management, and digital marketing.",
  keywords: [
    "Bond & Vale",
    "PR agency",
    "communications consultancy",
    "brand strategy",
    "reputation management",
    "strategic PR",
    "digital marketing agency",
    "brand growth",
    "media relations",
    "investor communications",
  ],
  authors: [{ name: "Bond & Vale" }],
  creator: "Bond & Vale",
  publisher: "Bond & Vale",

  metadataBase: new URL("https://bondandvale.com"),
  alternates: {
    canonical: "https://bondandvale.com",
  },

  openGraph: {
    title: "Bond & Vale | Strategic PR & Communications Consultancy",
    description:
      "We help brands grow with purpose, credibility, and trust through strategic communications, PR, and digital innovation.",
    url: "https://bondandvale.com",
    siteName: "Bond & Vale",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Bond & Vale – Strategic PR & Communications",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Bond & Vale | Strategic PR & Communications Consultancy",
    description:
      "Integrated communications consultancy delivering PR, brand strategy, and digital marketing for long-term growth.",
    images: ["/og-image.jpg"],
  },

  icons: {
    icon: [
      { url: "/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-v2.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/favicon-v2.png", sizes: "192x192" },
    ],
  },


  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
