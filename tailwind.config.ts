import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./config/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Identité mosquée
        primary: {
          50: "#f0f7f3",
          100: "#dcecdf",
          200: "#bbd9c2",
          300: "#92be9d",
          400: "#69a079",
          500: "#198754",
          600: "#147647",
          700: "#0F3D2E",
          800: "#0B2E22",
          900: "#0B1F18",
          950: "#06140F",
        },
        gold: {
          DEFAULT: "#C9A227",
          light: "#E0BE52",
          dark: "#A18419",
        },
        cream: "#F8F6F0",
        ink: {
          DEFAULT: "#1F2933",
          muted: "#667085",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      boxShadow: {
        soft: "0 2px 12px -3px rgba(15, 61, 46, 0.08), 0 1px 3px -1px rgba(15, 61, 46, 0.04)",
        elevated:
          "0 10px 40px -10px rgba(15, 61, 46, 0.12), 0 4px 12px -4px rgba(15, 61, 46, 0.06)",
        glow: "0 0 0 1px rgba(25, 135, 84, 0.1), 0 20px 60px -20px rgba(25, 135, 84, 0.25)",
      },
      backgroundImage: {
        "hero-pattern":
          "radial-gradient(ellipse at top, rgba(25,135,84,0.08), transparent 60%), radial-gradient(ellipse at bottom right, rgba(201,162,39,0.06), transparent 60%)",
        "dark-pattern":
          "radial-gradient(ellipse at top, rgba(25,135,84,0.25), transparent 65%), linear-gradient(180deg, #0B2E22 0%, #0B1F18 100%)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out",
        "fade-up": "fadeUp 0.7s ease-out",
        "scale-in": "scaleIn 0.4s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
