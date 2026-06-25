import type { NextConfig } from "next";

const legacyRedirects = [
  // Old service pages (WordPress paths)
  { source: "/pr", destination: "/services/public-relations" },
  { source: "/web-development", destination: "/services/website-development" },
  { source: "/brand-consultancy", destination: "/services/brand-consultancy" },
  { source: "/reputation-management", destination: "/services/reputation-management" },
  { source: "/digital-marketing", destination: "/services/digital-marketing" },
  { source: "/investor-relations", destination: "/services/investor-relations" },
  // Old site pages
  { source: "/contact-us", destination: "/contact" },
  { source: "/about", destination: "/" },
  { source: "/blogs", destination: "/blog" },
  { source: "/testimonials", destination: "/" },
  { source: "/testimonial", destination: "/" },
  { source: "/term-conditions", destination: "/terms-and-conditions" },
  // Old blog posts (not migrated — send to blog index)
  {
    source: "/what-is-the-difference-between-pr-and-marketing",
    destination: "/blog",
  },
  {
    source: "/digital-marketing-trends-2024-what-your-brand-needs-to-stay-ahead",
    destination: "/blog",
  },
  {
    source: "/branding-101-how-to-build-a-powerful-and-memorable-brand",
    destination: "/blog",
  },
  {
    source: "/the-power-of-pr-how-strategic-public-relations-can-transform-your-brand",
    destination: "/blog",
  },
] as const;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.prod.website-files.com" },
      { protocol: "https", hostname: "tadesign.b-cdn.net" },
    ],
  },

  async redirects() {
    return legacyRedirects.flatMap(({ source, destination }) => [
      { source, destination, permanent: true },
      { source: `${source}/`, destination, permanent: true },
    ]);
  },
};

export default nextConfig;
