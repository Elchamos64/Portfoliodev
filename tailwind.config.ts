import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        neon: {
          DEFAULT: "#00f5ff",
          glow: "#00f5ff",
        },
      },
      boxShadow: {
        'neon': '0 0 5px #00f5ff, 0 0 20px rgba(0, 245, 255, 0.3)',
        'neon-hover': '0 0 10px #00f5ff, 0 0 30px rgba(0, 245, 255, 0.5)',
      },
    },
  },
  plugins: [],
};
export default config;
