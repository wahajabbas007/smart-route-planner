/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: "#0F172A",
        cardBg: "#1E293B",
        accentBlue: "#38BDF8",
        accentGreen: "#4ADE80",
        accentOrange: "#FB923C",
      }
    },
  },
  plugins: [],
}