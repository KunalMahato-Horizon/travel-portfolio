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
      },
    },
  },
  plugins: [
    function({ addBase, theme }) {
      addBase({
        /* === VERTICAL SCROLLBARS === */
        '::-webkit-scrollbar': {
          width: '5px',
          height: '5px',
        },
        '::-webkit-scrollbar-track': {
          background: 'transparent', // ✅ Made transparent
          borderRadius: '10px',
        },
        '::-webkit-scrollbar-thumb': {
          background: 'linear-gradient(to bottom, rgba(251, 191, 36, 0.4), rgba(245, 158, 11, 0.3))',
          borderRadius: '10px',
          border: '1px solid rgba(251, 191, 36, 0.15)',
        },
        '::-webkit-scrollbar-thumb:hover': {
          background: 'linear-gradient(to bottom, rgba(251, 191, 36, 0.6), rgba(245, 158, 11, 0.4))',
        },

        /* === HORIZONTAL SCROLLBARS === */
        '.scrollbar-horizontal::-webkit-scrollbar': {
          height: '5px',
        },
        '.scrollbar-horizontal::-webkit-scrollbar-track': {
          background: 'transparent', // ✅ Made transparent
          borderRadius: '10px',
        },
        '.scrollbar-horizontal::-webkit-scrollbar-thumb': {
          background: 'linear-gradient(to right, rgba(251, 191, 36, 0.4), rgba(245, 158, 11, 0.3))',
          borderRadius: '10px',
          border: '1px solid rgba(251, 191, 36, 0.15)',
        },
        '.scrollbar-horizontal::-webkit-scrollbar-thumb:hover': {
          background: 'linear-gradient(to right, rgba(251, 191, 36, 0.6), rgba(245, 158, 11, 0.4))',
        },

        /* === HORIZONTAL SCROLLBAR - Minimal Variant === */
        '.horizontal-scroll::-webkit-scrollbar': {
          height: '3px',
        },
        '.horizontal-scroll::-webkit-scrollbar-track': {
          background: 'transparent', // ✅ Made transparent
          borderRadius: '10px',
        },
        '.horizontal-scroll::-webkit-scrollbar-thumb': {
          background: 'rgba(251, 191, 36, 0.3)',
          borderRadius: '10px',
        },
        '.horizontal-scroll::-webkit-scrollbar-thumb:hover': {
          background: 'rgba(251, 191, 36, 0.5)',
        },

        /* === FIREFOX SUPPORT === */
        '*': {
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(251, 191, 36, 0.4) transparent', // ✅ Track is transparent
        },
      });
    },
  ],
}