import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["selector", "[data-mantine-color-scheme='dark']"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./theme/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: { center: true, padding: "1.5rem", screens: { xl: "1280px" } },
    screens: { sm: "640px", md: "768px", lg: "960px", xl: "1280px" },
    fontFamily: {
      primary: ["var(--font-jetbrainsMono)", "JetBrains Mono", "monospace"],
    },
    extend: {
      colors: {
        primary: "#1c1c22",
        accent: { DEFAULT: "#ff922b", hover: "#fd7e14" },
        "accent-hover": "#fd7e14",
        "primary-light": "#9ca3af",
        secondary: "#9ca3af",
        "year-tag": "#1c1c22",
        "link-blue": "#ff922b",
      },
      borderRadius: {
        card: "1rem",
        tag: "1rem",
      },
      boxShadow: {
        card: "0 1px 3px 0 rgb(0 0 0 / 0.05), 0 1px 2px -1px rgb(0 0 0 / 0.05)",
        "card-hover":
          "0 4px 6px -1px rgb(0 0 0 / 0.08), 0 2px 4px -2px rgb(0 0 0 / 0.05)",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
export default config;
