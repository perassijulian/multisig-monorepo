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
        border: "var(--color-border)",
        ring: "var(--color-ring)",
      },
      borderRadius: {
        DEFAULT: "var(--radius-base)",
        lg: "var(--radius-lg)",
      },
    },
  },
  plugins: [],
} satisfies Config;
