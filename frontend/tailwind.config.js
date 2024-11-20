/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'dark1': 'var(--dark1)',
        'dark2': 'var(--dark2)',
        'dark3': 'var(--dark3)',
        'light1': 'var(--light1)',
        'light1hover': 'var(--light1hover)',
        'light2': 'var(--light2)',
        'light3': 'var(--light3)',
        'button': 'var(--button)',
        'buttonhover': 'var(--buttonhover)',
        'bodytext': 'var(--bodytext)',
        'warningcolor': 'var(--warningcolor)'
      },
    },
  },
  plugins: [],
};