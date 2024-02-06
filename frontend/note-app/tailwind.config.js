/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'screen-level-1': '300px',
      'screen-level-2': '450px',
      'screen-level-3': '600px',
      'screen-level-4': '750px',
      'screen-level-5': '900px',
      'screen-level-6': '1050px',
      'screen-level-7': '1200px',
    },
    extend: {},
  },
  plugins: [],
}

