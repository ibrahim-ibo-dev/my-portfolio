import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ibrahim-eng.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ibrahim Hussein | AI Product Builder for Real Businesses",
    template: "%s | Ibrahim Hussein",
  },
  description:
    "Ibrahim Hussein — Kurdish AI systems builder helping real businesses automate customer communication, ordering, and operations with multilingual, RTL-native AI platforms. Co-founder of CSAI, creator of Chat Mart, showcased at HITEX 2025.",
  keywords: [
    "Ibrahim Hussein",
    "AI product builder",
    "AI systems for businesses",
    "Kurdish AI",
    "multilingual AI",
    "RTL Kurdish",
    "customer automation",
    "WhatsApp AI",
    "Chat Mart",
    "CSAI",
    "HITEX",
    "Kurdistan startup",
  ],
  authors: [{ name: "Ibrahim Hussein" }],
  creator: "Ibrahim Hussein",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    title: "Ibrahim Hussein | AI Product Builder for Real Businesses",
    description:
      "Building AI-powered, multilingual, RTL-native systems that help Kurdish and regional businesses automate customer communication and scale operations.",
    siteName: "Ibrahim Hussein Portfolio",
    locale: "en_US",
    url: "/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ibrahim Hussein Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ibrahim Hussein | AI Product Builder for Real Businesses",
    description:
      "Building AI-powered, multilingual, RTL-native systems that help Kurdish and regional businesses automate customer communication and scale operations.",
    images: ["/og-image.png"],
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
import CustomCursor from "@/components/CustomCursor";
import DeveloperEasterEgg from "@/components/DeveloperEasterEgg";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${spaceGrotesk.variable} antialiased`}>
        {/* SEO JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Ibrahim Hussein",
              jobTitle: "AI Product Builder",
              url: "https://ibrahim-eng.dev",
              sameAs: [
                "https://github.com/ibrahim-ibo-dev",
                "https://www.linkedin.com/in/ibrahim-hussein-b080712b7/"
              ],
              alumniOf: "Salahaddin University",
              knowsAbout: [
                "AI Product Development",
                "Multilingual AI Systems",
                "Customer Automation",
                "Kurdish NLP",
                "RTL Web Platforms",
                "SaaS Architecture",
                "Computer Vision",
                "Business Process Automation"
              ]
            })
          }}
        />
        <CustomCursor />
        <DeveloperEasterEgg />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
