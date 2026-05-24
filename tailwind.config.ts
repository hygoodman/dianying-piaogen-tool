import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#080706",
        ember: "#c93326",
        gold: "#d7a34d",
        parchment: "#ead3aa"
      },
      boxShadow: {
        glow: "0 0 32px rgba(201, 51, 38, 0.28)"
      },
      fontFamily: {
        display: ["Georgia", "Noto Serif SC", "serif"],
        sans: ["Arial", "PingFang SC", "Microsoft YaHei", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
