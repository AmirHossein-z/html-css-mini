import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bright-turquoise": "#08D9D6",
        "radical-red": "#FF2E63",
        gallery: "#EAEAEA",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "sky-cloudy": "url(/images/sky-cloudy.jpg)",
      },
      boxShadow: {
        glass: "inset 0px 2px 22px 0px rgba(255,255,255,0.6)",
        blue: "0px 0px 7px 0px rgba(8, 217, 214, 0.87)",
      },
      animation: {
        fade_in_from_right: "fade_in_from_right 700ms 1",
        fade_in_from_bottom: "fade_in_from_bottom 700ms 1",
        blur_in: "blur_in 0.4s linear both",
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
        blur_in: {
          "0%": { filter: "blur(12px)", opacity: "0" },
          "100%": { filter: "blur(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [require("daisyui")],
};
export default config;
