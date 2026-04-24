/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        mighty: {
          light: '#F5F2EA',
          DEFAULT: '#84cc16',
          dark: '#050505',
          black: '#050505',
          gray: '#2A2A2A',
        },
      },
      letterSpacing: {
        brand: '0.35em',
        micro: '0.25em',
      },
    },
  },
  plugins: [],
}