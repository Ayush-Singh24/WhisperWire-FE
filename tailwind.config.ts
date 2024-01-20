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
        "primary-color-dark": "#090e1a",
        "primary-color-med": "#0c1323",
        "primary-color-light": "#131a2b",
        "primary-text": "#F8F4EB",
        "secondary-text": "#526183",
        "secondary-color-dark": "#5a0b5d",
        "secondary-color-light": "#9b31b0",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-home":
          "linear-gradient(130deg, #090e1a 0%, #090e1a 50%, #131a2b 50%, #131a2b 100%)",
        "gradient-text":
          "linear-gradient(68deg, rgb(7, 3, 98) -0.1%, rgb(179, 26, 132) 47.7%, rgb(239, 186, 83) 100.2%);",
      },
    },
  },
  plugins: [],
};
export default config;
