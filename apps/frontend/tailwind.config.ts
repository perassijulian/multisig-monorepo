import type { Config } from "tailwindcss";

export default {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--color-bg)",
        bgSubtle: "var(--color-bg-subtle)",
        bgMoreSubtle: "var(--color-bg-more-subtle)",
        text: "var(--color-text)",
        textMuted: "var(--color-text-muted)",
        primary: "var(--color-primary)",
        primaryHover: "var(--color-primary-hover)",
        secondary: "var(--color-secondary)",
        secondaryHover: "var(--color-secondary-hover)",
        skeletonBase: "var(--color-skeleton-base)",
        skeletonHighlight: "var(--color-skeleton-highlight)",
        border: "var(--color-border)",
        ring: "var(--color-ring)",
      },
      borderRadius: {
        DEFAULT: "var(--radius-base)",
        lg: "var(--radius-lg)",
      },
      dropShadow: {
        glowGreen: "0 0 6px rgba(34,197,94,0.6)",
        glowRed: "0 0 6px rgba(197, 34, 34, 0.6)",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
      },
      animation: {
        shimmer: "shimmer 5s infinite linear",
      },
    },
  },
  plugins: [],
} satisfies Config;
