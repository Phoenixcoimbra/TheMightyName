/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        mighty: {
          light: '#eff6ff', // Ice Blue
          DEFAULT: '#1d4ed8', // Primary Blue
          dark: '#1e3a8a', // Deep Navy
          black: '#030712', // Near Black for contrast
        },
      },
    },
  },
  plugins: [],
}