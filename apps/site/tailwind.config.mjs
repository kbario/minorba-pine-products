// @ts-check
import plugin from "tailwindcss";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      height: {
        view: "80svh",
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#16a34a",
          "primary-content": "#f0fdf4",
          secondary: "#86efac",
          "secondary-content": "#06140b",
          accent: "#67e8f9",
          "accent-content": "#041315",
          neutral: "#cbd5e1",
          "neutral-content": "#0f1012",
          "base-100": "#f8fafc",
          "base-200": "#d8d9db",
          "base-300": "#b8babb",
          "base-content": "#151516",
          info: "#93c5fd",
          "info-content": "#080e16",
          success: "#84cc16",
          "success-content": "#060f00",
          warning: "#f59e0b",
          "warning-content": "#150900",
          error: "#dc2626",
          "error-content": "#ffd9d4",
        },
      },
    ],
  },
  plugins: [
    require("daisyui"),
    plugin(function ({ addBase }) {
      addBase({
        h1: { fontSize: "2rem" },
      });
    }),
  ],
};
