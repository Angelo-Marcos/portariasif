/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: 'Inter, sans-serif'
      },
      colors: {
        green: {
          300: '#0B6503',
          500: '#0B8C00',
          700: '#195128'
        },
        gray: {
          100: '#EEF1EC',
          200: '#DFEEE1',
          300: '#D9D9D9',
          400: '#CEE4D0',
          500: '#343434'
        },
        red: {
          900: '#690202'
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
