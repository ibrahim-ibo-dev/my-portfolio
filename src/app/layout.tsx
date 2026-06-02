import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ibrahim-eng.dev";

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
    title: "Ibrahim Hussein | Computer Engineer & AI Developer",
    description:
      "Award-winning Computer Engineering student building AI-powered applications, full-stack solutions, and innovative hardware systems.",
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
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        {/* AI Crawlers — llms.txt discovery */}
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLMs.txt" />
        {/* Image sitemap for Google Images */}
        <link rel="sitemap" type="application/xml" href="/image-sitemap.xml" />
        {/* Geo tags for local SEO */}
        <meta name="geo.region" content="IQ-AR" />
        <meta name="geo.placename" content="Erbil, Kurdistan Region" />
        {/* Additional verification & discovery */}
        <meta name="subject" content="Computer Engineering, AI Development, Web Development Portfolio" />
        <meta name="classification" content="Portfolio, Technology, Software Engineering" />
        <meta name="rating" content="General" />
        <meta name="revisit-after" content="7 days" />
      </head>
      <body className={`${spaceGrotesk.variable} antialiased`}>
        {/* SEO JSON-LD Structured Data — Person */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Ibrahim Hussein",
              givenName: "Ibrahim",
              familyName: "Hussein",
              jobTitle: "Computer Engineer & AI Developer",
              description: "Award-winning Computer Engineering student from Kurdistan Region, Iraq. Co-founder of CSAI. Full-stack developer, AI specialist, and hardware innovator.",
              url: "https://ibrahim-eng.dev",
              image: "https://ibrahim-eng.dev/images/profile.jpg",
              email: "ibrahimhuseein842@gmail.com",
              sameAs: [
                "https://github.com/ibrahim-ibo-dev",
                "https://www.linkedin.com/in/ibrahim-hussein-b080712b7/"
              ],
              alumniOf: {
                "@type": "CollegeOrUniversity",
                name: "Salahaddin University-Erbil",
                url: "https://su.edu.krd"
              },
              knowsAbout: [
                "Artificial Intelligence",
                "Machine Learning",
                "Web Development",
                "Next.js",
                "React",
                "Python",
                "PHP",
                "Three.js",
                "Embedded Systems",
                "Arduino",
                "Natural Language Processing",
                "Computer Vision"
              ],
              nationality: {
                "@type": "Country",
                name: "Iraq"
              },
              address: {
                "@type": "PostalAddress",
                addressLocality: "Erbil",
                addressRegion: "Kurdistan Region",
                addressCountry: "IQ"
              },
              award: [
                "1st Place — Kurdistan Region CTF Competition",
                "HITEX Technology Expo 2025 — CSAI Showcase",
                "CodeSignal Advanced Certification"
              ]
            })
          }}
        />
        {/* JSON-LD — WebSite with SearchAction */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Ibrahim Hussein Portfolio",
              url: "https://ibrahim-eng.dev",
              description: "Portfolio of Ibrahim Hussein — Computer Engineer & AI Developer from Kurdistan Region, Iraq",
              author: {
                "@type": "Person",
                name: "Ibrahim Hussein"
              }
            })
          }}
        />
        {/* JSON-LD — ProfilePage */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfilePage",
              mainEntity: {
                "@type": "Person",
                name: "Ibrahim Hussein",
                url: "https://ibrahim-eng.dev"
              },
              dateCreated: "2024-01-01",
              dateModified: new Date().toISOString().split('T')[0]
            })
          }}
        />
        {/* JSON-LD — ItemList for Projects */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              name: "Ibrahim Hussein Projects",
              description: "Software and hardware projects by Ibrahim Hussein",
              numberOfItems: 6,
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  item: {
                    "@type": "SoftwareApplication",
                    name: "Chat Mart — Omni-Channel SaaS",
                    description: "Multi-company AI marketplace with 5 messaging channels, Kurdish TTS voice replies, RBAC with 17+ permissions",
                    url: "https://chat-mart.com",
                    applicationCategory: "BusinessApplication",
                    operatingSystem: "Web",
                    image: "https://ibrahim-eng.dev/images/projects/chat-mart.png"
                  }
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  item: {
                    "@type": "SoftwareApplication",
                    name: "Ashti Library",
                    description: "Kurdish bookstore with AI-powered recommendations via Gemini API, RTL Kurdish support, WhatsApp ordering",
                    url: "https://ashtilibrary.com",
                    applicationCategory: "ShoppingApplication",
                    operatingSystem: "Web",
                    image: "https://ibrahim-eng.dev/images/projects/ashti-library.jpg"
                  }
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  item: {
                    "@type": "SoftwareApplication",
                    name: "True Prence — Face Recognition Attendance",
                    description: "Face recognition attendance system identifying up to 20 students per frame using CNN/HOG detection",
                    url: "https://github.com/ibrahim-ibo-dev/Attendance-System",
                    applicationCategory: "EducationalApplication",
                    image: "https://ibrahim-eng.dev/images/projects/true-prence.jpg"
                  }
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  item: {
                    "@type": "SoftwareApplication",
                    name: "Signed Language Recognition",
                    description: "Real-time gesture recognition using MediaPipe with custom KNN classifier for sign language",
                    url: "https://github.com/ibrahim-ibo-dev/AI-Sign-Language",
                    applicationCategory: "UtilitiesApplication",
                    image: "https://ibrahim-eng.dev/images/projects/signed-language.jpg"
                  }
                }
              ]
            })
          }}
        />
        <CustomCursor />
        <DeveloperEasterEgg />
        <SmoothScroll>{children}</SmoothScroll>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
