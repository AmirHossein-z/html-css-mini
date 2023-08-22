import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        glass: "inset 0px 2px 22px 0px rgba(255,255,255,0.6)",
      },
      animation: {
        fade_in_from_right: "fade_in_from_right 700ms 1",
        fade_in_from_bottom: "fade_in_from_bottom 700ms 1",
      },
      keyframes: {
        fade_in_from_right: {
          "0%": { opacity: "0", transform: "translateX(128px)" },
          "100%": { opacity: "1", transform: "translateX(0px)" },
        },
        fade_in_from_bottom: {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
