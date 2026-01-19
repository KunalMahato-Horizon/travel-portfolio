/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'devanagari': ['Noto Sans Devanagari', 'sans-serif'],
      },
    colors: {
      bg: "var(--bg)",
      text: "var(--text)",
      muted: "var(--muted)",
      border: "var(--border)",
    },},
  },
  plugins: [],
}