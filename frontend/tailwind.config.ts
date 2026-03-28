import type { Config } from "tailwindcss";

/**
 * Tailwind CSS configuration for the AI Crop Advisory frontend.
 * Content paths are scoped to `app/` and `components/` for fast builds.
 */
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        earth: {
          50: "#f7f5ef",
          100: "#ede8d8",
          200: "#d9d0b8",
          300: "#c0b390",
          400: "#a8966d",
          500: "#8f7a52",
          600: "#6f5f44",
          700: "#5a4a3a",
          800: "#4d3f32",
          900: "#42362f",
        },
        leaf: {
          50: "#f7faf5",
          100: "#e8f1dc",
          200: "#d9e6c6",
          300: "#b3c99a",
          400: "#8aa86e",
          500: "#5f8f4f",
          600: "#3f6b3c",
          700: "#325a32",
          800: "#2a472a",
          900: "#234522",
        },
      },
      fontFamily: {
        sans: ["var(--font-noto-sans)", "system-ui", "sans-serif"],
        urdu: ["var(--font-noto-urdu)", "serif"],
      },
      boxShadow: {
        card: "0 18px 48px rgba(72, 88, 54, 0.1)",
        lift: "0 14px 28px rgba(41, 80, 46, 0.22)",
      },
      animation: {
        "fade-in": "fadeUp 0.65s ease both",
        "fade-in-delay": "fadeUp 0.65s ease 0.12s both",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
