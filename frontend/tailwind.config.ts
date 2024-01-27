import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        'color-0': '#ffffff',
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
        'color-14': '#36D6D1',
        'color-15': '#949197',
        'color-16': '#7F7F7F',
        'color-17': '#17222A',
        'color-18': '#19232B',
        'color-19': '#FFFBF3',
        'color-20': '#004A7E',
        'color-21': '#02C655',
        'color-22': '#EC0C0C',
        'color-23': '#AFB5C3',
        'color-24': '#EAEDF4',
        'button-rgba': 'rgba(255, 255, 255, 0.10)',
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      backgroundImage: {
        'cardBackground': 'url("../../public/assets/cardBackground.jpeg")',
      },
      fontFamily: {
        'nico-moji': ['nico Moji', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
        'iiii': ['ui-sans-serif', 'system-ui'],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config