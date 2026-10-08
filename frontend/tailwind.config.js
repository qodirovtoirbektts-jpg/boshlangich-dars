/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        barber: {
          dark: '#111827',
          gold: '#fbbf24',
          accent: '#b45309',
        }
      }
    },
  },
  plugins: [],
}
