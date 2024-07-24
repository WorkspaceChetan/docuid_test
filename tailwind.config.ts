import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#635bff",
        success: "#0CBE5E",
        warning: "#FFDD0F",
        "light-grey": "#f2f2f4",
        "primary-text": "#1C274C",
        "secondary-text": "#6B778C",
        "grey-text": "#64748B",
      },
      spacing: {
        "1.25": "5px",
        "4.5": "18px",
        "7.5": "30px",
        "76": "300px",
      },
    },
    fontSize: {
      "2.5": "10px",
    },
  },
  plugins: [],
};
export default config;
