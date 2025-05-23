import type { Config } from "tailwindcss";
import daisyui from "daisyui";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: "1.25rem",
      screens: {
        xl: "1200px",
        "2xl": "1200px",
      },
    },
    extend: {
      fontSize: {
        base: "1.25rem", // Example: Change the base font size
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "custom-blue": "#203b4d",
        "custom-red": "#B61918",
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["light"],
  },
} satisfies Config;
