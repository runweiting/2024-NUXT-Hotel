/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue'
  ],
  // 寫在 theme 直接覆蓋
  theme: {
    container: {
      center: true,
      padding: '12px'
    },
    // 寫在 extend 是擴充
    extend: {
      fontFamily: {
        sans: ['"Noto Sans TC"', ...defaultTheme.fontFamily.sans],
        serif: ['"Noto Serif TC"', ...defaultTheme.fontFamily.serif]
      },
      colors: {
        primary: {
          50: '#F7F2EE',
          100: '#E5D3C8',
          200: '#CCB396',
          300: '#BF9D7D',
          400: '#B08D74',
          500: '#A17D6B',
          600: '#876353',
          700: '#6B4C3E',
          800: '#503629',
          900: '#342014',
          950: '#1E0F09'
        }
      }
    }
  },
  plugins: [require('@tailwindcss/forms')],
  darkMode: 'class'
}
