/** @type {import('tailwindcss').Config} */
import {nextui} from "@nextui-org/react";

const config = {
  content: [
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'sans': ['ui-sans-serif', 'system-ui'],
        'nico-moji': ['"Nico Moji"', 'sans-serif'],
      },
      colors: {
        'color-1': '#FDBF50',
        'color-2': '#DD6243',
        'color-3': '#FCF6EF',
        'color-4': '#517761',
        'color-5': '#346182',
        'color-6': '#52768F',
        'color-7': '#CD4332',
        'color-8': '#EB9451',
        'color-9': '#804D35',
        'color-10': '#F1CEA4',
        'color-11': '#4F716F',
        'color-12': '#FCEFDA',
        'color-13': '#263642',
      },
      backgroundImage: {
        'cardBackground': 'url("../../public/assets/cardBackground.jpeg")',
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()]
}

export default config;
