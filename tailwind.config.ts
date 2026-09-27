import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
      },
      colors: {
        navy: {
          800: '#1e293b',
          900: '#0f172a',
          950: '#080d1a',
        },
        orange: {
          500: '#f97316',
          600: '#ea580c',
        },
        purple: {
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
        }
      },
    },
  },
  plugins: [],
};
export default config;
