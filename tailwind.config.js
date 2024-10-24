/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary_500: "#877EFF",
        secondary: '#FFB620',
        dark:{
          100: '#000000',
          200: '#09090A',
          300: '#101012',
          400: '#1F1F22',
        },
        light: {
          100: '#FFFFFF',
          200: '#EFEFEF',
          300: '#7878A3',
          400: '#5C5C7B'
        },
        blue:{
          100: '#0095F6'
        },
        purple: '#877EFF',
        gradient: 'linear-gradient(180deg, #877EFF 0%, #685DFF 46.15%, #3121FF 100%)'
      }
    },
  },
  plugins: [],
}