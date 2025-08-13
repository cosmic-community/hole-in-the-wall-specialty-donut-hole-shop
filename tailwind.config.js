/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Warm bakery color palette
        burgundy: {
          50: '#fdf2f2',
          100: '#fce7e7',
          200: '#f9d4d4',
          300: '#f4b0b0',
          400: '#ec7c7c',
          500: '#e04848',
          600: '#cd2c2c',
          700: '#ab1f1f',
          800: '#8e1c1c',
          900: '#7a1d1d',
        },
        cream: {
          50: '#fefdfb',
          100: '#fdfaf5',
          200: '#fbf4ea',
          300: '#f7ebd4',
          400: '#f1dab4',
          500: '#e8c284',
          600: '#dba855',
          700: '#c68e3a',
          800: '#a37030',
          900: '#845c2a',
        },
        donut: {
          glaze: '#f7ebd4',
          chocolate: '#8b4513',
          strawberry: '#ff69b4',
          maple: '#d2691e',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'bounce-gentle': 'bounceGentle 1s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
      boxShadow: {
        'soft': '0 2px 15px rgba(0, 0, 0, 0.1)',
        'warm': '0 4px 20px rgba(205, 44, 44, 0.1)',
      },
    },
  },
  plugins: [],
}