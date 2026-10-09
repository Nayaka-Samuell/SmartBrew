import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ── Palet warna kopi kustom ──────────────────────────────────────────
      colors: {
        coffee: {
          50:  "#fdf6f0",
          100: "#faeade",
          200: "#f4d4bc",
          300: "#eab896",
          400: "#de9265",
          500: "#d47234",  // amber kopi
          600: "#c45e22",
          700: "#a04a1b",
          800: "#7a3a17",  // coklat sedang
          900: "#5c2d11",  // coklat tua
          950: "#3b1c0a",  // coklat sangat gelap
        },
        cream: "#fff8f0",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;

