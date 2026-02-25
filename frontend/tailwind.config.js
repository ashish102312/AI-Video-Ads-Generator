import { color } from 'framer-motion';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      keyframes: {
        autoHover: {
          '0%,100%': { color: 'currentColor' },
          '50%': { color: '#3b82f6' },
        },
      },
      animation: {
        autoHover: 'autoHover 2.0s infinite',
      },
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          900: '#1e3a8a',
        },
        dark: {
          bg: '#0f172a',
          surface: '#1e293b',
          border: '#334155',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
