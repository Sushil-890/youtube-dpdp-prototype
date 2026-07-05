/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        youtube: {
          red: '#FF0000',
          darkRed: '#CC0000',
          lightRed: '#FFEEEE',
          dark: '#030303',
          gray: '#606060',
          lightGray: '#F9F9F9',
          border: '#E5E5E5',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
