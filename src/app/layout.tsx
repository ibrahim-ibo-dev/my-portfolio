import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ibrahimhussein.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ibrahim Hussein | Computer Engineer & AI Developer",
    template: "%s | Ibrahim Hussein",
  },
  description:
    "Portfolio of Ibrahim Hussein — Award-winning Computer Engineering student, AI developer, full-stack engineer, and innovator from Kurdistan Region, Iraq. Co-founder of CSAI, showcased at HITEX 2025.",
  keywords: [
    "Ibrahim Hussein",
    "computer engineer",
    "AI developer",
    "full-stack developer",
    "Kurdistan",
    "portfolio",
    "React",
    "Next.js",
    "Python",
    "machine learning",
    "CSAI",
    "HITEX",
  ],
  authors: [{ name: "Ibrahim Hussein" }],
  creator: "Ibrahim Hussein",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    title: "Ibrahim Hussein | Computer Engineer & AI Developer",
    description:
      "Award-winning Computer Engineering student building AI-powered applications, full-stack solutions, and innovative hardware systems.",
    siteName: "Ibrahim Hussein Portfolio",
    locale: "en_US",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ibrahim Hussein | Computer Engineer & AI Developer",
    description:
      "Award-winning Computer Engineering student building AI-powered applications, full-stack solutions, and innovative hardware systems.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.svg",
  },
  other: {
    "theme-color": "#0A0A0F",
  },
};

import SmoothScroll from "@/components/SmoothScroll";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${spaceGrotesk.variable} antialiased`}>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
