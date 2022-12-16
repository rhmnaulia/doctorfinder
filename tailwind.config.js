/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      brand: '#61C7B5',
    },
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: ['light'],
}
