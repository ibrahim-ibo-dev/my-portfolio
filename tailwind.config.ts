import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      /* ── Color System ── */
      colors: {
        primary: "#0A0A0F",
        secondary: "#12121A",
        surface: {
          DEFAULT: "#12121A",
          raised: "#1A1A24",
          overlay: "#22222E",
        },
        accent: {
          DEFAULT: "#D4A574",
          light: "#E8C9A0",
          soft: "rgba(212, 165, 116, 0.12)",
          muted: "rgba(212, 165, 116, 0.06)",
        },
        "accent-light": "#E8C9A0",
        muted: "#8A8A9A",
        subtle: "#5A5A6A",
        border: {
          DEFAULT: "rgba(255, 255, 255, 0.06)",
          accent: "rgba(212, 165, 116, 0.15)",
          hover: "rgba(212, 165, 116, 0.25)",
        },
        textColor: "#E8E4E0",
      },
      /* ── Typography ── */
      fontFamily: {
        sans: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      fontSize: {
        "display": ["clamp(2.5rem, 5vw + 1rem, 4.5rem)", { lineHeight: "1.05", letterSpacing: "-0.03em", fontWeight: "700" }],
        "heading": ["clamp(2rem, 3.5vw + 0.5rem, 3.5rem)", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "600" }],
        "subheading": ["clamp(1.125rem, 1.5vw + 0.5rem, 1.5rem)", { lineHeight: "1.4", letterSpacing: "-0.01em" }],
        "body-lg": ["1.0625rem", { lineHeight: "1.7" }],
        "body": ["0.9375rem", { lineHeight: "1.7" }],
        "caption": ["0.75rem", { lineHeight: "1.5", letterSpacing: "0.02em" }],
        "overline": ["0.6875rem", { lineHeight: "1.3", letterSpacing: "0.15em", fontWeight: "500" }],
      },
      /* ── Spacing (8px rhythm) ── */
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "26": "6.5rem",
        "30": "7.5rem",
        "34": "8.5rem",
        "38": "9.5rem",
      },
      /* ── Elevation Shadows ── */
      boxShadow: {
        "glow-sm": "0 0 20px rgba(212, 165, 116, 0.08)",
        "glow-md": "0 0 40px rgba(212, 165, 116, 0.12)",
        "glow-lg": "0 0 60px rgba(212, 165, 116, 0.18)",
        "glow-xl": "0 0 80px rgba(212, 165, 116, 0.25)",
        "elevation-1": "0 1px 3px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.4)",
        "elevation-2": "0 4px 6px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.4)",
        "elevation-3": "0 10px 20px rgba(0,0,0,0.3), 0 3px 6px rgba(0,0,0,0.35)",
        "elevation-4": "0 15px 40px rgba(0,0,0,0.4), 0 5px 15px rgba(0,0,0,0.3)",
        "card": "0 4px 24px rgba(0,0,0,0.25), 0 0 0 1px rgba(212,165,116,0.04)",
        "card-hover": "0 8px 40px rgba(0,0,0,0.35), 0 0 0 1px rgba(212,165,116,0.12), 0 0 30px rgba(212,165,116,0.06)",
      },
      /* ── Border Radius ── */
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.25rem",
        "4xl": "1.5rem",
      },
      /* ── Backdrop Blur ── */
      backdropBlur: {
        xs: "2px",
        "2xl": "20px",
        "3xl": "40px",
      },
      /* ── Motion Tokens ── */
      transitionDuration: {
        "250": "250ms",
        "400": "400ms",
        "600": "600ms",
        "800": "800ms",
      },
      transitionTimingFunction: {
        "premium": "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        "smooth": "cubic-bezier(0.4, 0, 0.2, 1)",
        "bounce": "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      /* ── Animations ── */
      animation: {
        "float": "float 6s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "shimmer": "shimmer 2.5s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px #D4A574, 0 0 10px #D4A574" },
          "100%": { boxShadow: "0 0 20px #D4A574, 0 0 40px #E8C9A0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
