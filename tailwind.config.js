// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // dark mode by adding 'dark' class on <html> or root
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // optional custom colors

        campverse: {
          lightBg: "#f8fafc",
          darkBg: "#020617",
        },
      },
      keyframes: {
        noticePop: {
          "0%": { opacity: "0", transform: "translateY(6px) scale(0.98)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
      },
      animation: {
        noticePop: "noticePop 0.35s ease-out",
      },
    },
  },
  plugins: [],
};
