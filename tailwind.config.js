/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#cc73f8',
          dark: '#b44fe4',
          light: '#d68ff9'
        },
        dark: {
          DEFAULT: '#1A1A1A',
          light: '#2D2D2D'
        }
      }
    },
  },
  plugins: [],
};