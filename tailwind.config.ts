import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        vazir: ["var(--font-vazir)", "Tahoma", "sans-serif"],
      },
      colors: {
        espresso: {
          50: "#faf6f2",
          100: "#f1e7dc",
          200: "#e2cbb4",
          300: "#cfa987",
          400: "#bd8662",
          500: "#a86a47",
          600: "#8c5239",
          700: "#6f3f30",
          800: "#4b2a20",
          900: "#2b1812",
          950: "#190d09",
        },
        cream: "#f3e9dc",
        gold: "#d4a35a",
        latte: "#c8a27c",
      },
      boxShadow: {
        glow: "0 0 60px -10px rgba(212, 163, 90, 0.45)",
        card: "0 30px 60px -20px rgba(0,0,0,0.6)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-18px)" },
        },
        steam: {
          "0%": { transform: "translateY(0) scaleX(1)", opacity: "0" },
          "15%": { opacity: "0.6" },
          "50%": { opacity: "0.35" },
          "100%": { transform: "translateY(-60px) scaleX(1.6)", opacity: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        spinSlow: {
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        steam: "steam 4s ease-out infinite",
        shimmer: "shimmer 6s linear infinite",
        spinSlow: "spinSlow 26s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
