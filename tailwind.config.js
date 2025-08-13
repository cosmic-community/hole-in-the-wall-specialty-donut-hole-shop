/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Custom burgundy palette
        burgundy: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
        },
        // Custom cream palette
        cream: {
          50: '#fffbf7',
          100: '#fff7ed',
          200: '#ffedd5',
          300: '#fed7aa',
          400: '#fdba74',
          500: '#fb923c',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        // Custom gold palette
        gold: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        // Magical color palette inspired by animated adventures
        magical: {
          50: '#f8faff',
          100: '#e6f0ff',
          200: '#b3d9ff',
          300: '#80c2ff',
          400: '#4dabff',
          500: '#1a94ff',
          600: '#007ce6',
          700: '#0063cc',
          800: '#004db3',
          900: '#003699',
        },
        // Extended purple palette
        purple: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7c3aed',
          800: '#6b21a8',
          900: '#581c87',
        },
        // Extended blue palette  
        blue: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        // Extended pink palette
        pink: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
        magical: ['Comfortaa', 'cursive'],
      },
      boxShadow: {
        'magical': '0 25px 50px -12px rgba(147, 51, 234, 0.25), 0 0 0 1px rgba(147, 51, 234, 0.05)',
        'glow': '0 0 20px rgba(147, 51, 234, 0.3), 0 0 40px rgba(59, 130, 246, 0.2)',
        'glow-sm': '0 0 10px rgba(147, 51, 234, 0.3)',
        'glow-lg': '0 0 30px rgba(147, 51, 234, 0.4), 0 0 60px rgba(59, 130, 246, 0.3)',
        'sparkle': '0 0 15px rgba(255, 255, 255, 0.8), 0 0 30px rgba(147, 51, 234, 0.6)',
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'warm': '0 10px 25px -5px rgba(251, 191, 36, 0.1), 0 20px 40px -10px rgba(251, 191, 36, 0.08)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-magical': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-mystical': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'gradient-enchanted': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'gradient-ethereal': 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        'gradient-cosmic': 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        'mesh-gradient': 'radial-gradient(at 40% 20%, hsla(228,100%,70%,1) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(189,100%,56%,1) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(355,100%,93%,1) 0px, transparent 50%), radial-gradient(at 80% 50%, hsla(340,100%,76%,1) 0px, transparent 50%), radial-gradient(at 0% 100%, hsla(22,100%,77%,1) 0px, transparent 50%), radial-gradient(at 80% 100%, hsla(242,100%,70%,1) 0px, transparent 50%), radial-gradient(at 0% 0%, hsla(343,100%,76%,1) 0px, transparent 50%)',
      },
      animation: {
        'magical-entrance': 'magicalEntrance 1s ease-out forwards',
        'sparkle': 'sparkle 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out infinite 2s',
        'float-fast': 'float 4s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
        'gradient': 'gradientShift 4s ease infinite',
        'bounce-gentle': 'bounceGentle 2s infinite',
        'twinkle': 'twinkle 2s ease-in-out infinite',
        'pulse-magical': 'pulseMagical 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'spin-slow': 'spin 3s linear infinite',
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      keyframes: {
        magicalEntrance: {
          '0%': { 
            opacity: '0', 
            transform: 'translateY(50px) scale(0.9)',
            filter: 'blur(10px)',
          },
          '100%': { 
            opacity: '1', 
            transform: 'translateY(0) scale(1)',
            filter: 'blur(0px)',
          },
        },
        sparkle: {
          '0%, 100%': { 
            opacity: '0', 
            transform: 'scale(0) rotate(0deg)',
          },
          '50%': { 
            opacity: '1', 
            transform: 'scale(1) rotate(180deg)',
          },
        },
        float: {
          '0%, 100%': { 
            transform: 'translateY(0px) rotate(0deg)',
          },
          '33%': { 
            transform: 'translateY(-20px) rotate(2deg)',
          },
          '66%': { 
            transform: 'translateY(-10px) rotate(-1deg)',
          },
        },
        glow: {
          '0%': { 
            boxShadow: '0 0 20px rgba(147, 51, 234, 0.3)',
          },
          '100%': { 
            boxShadow: '0 0 40px rgba(147, 51, 234, 0.6), 0 0 60px rgba(59, 130, 246, 0.3)',
          },
        },
        gradientShift: {
          '0%, 100%': { 
            backgroundPosition: '0% 50%',
          },
          '50%': { 
            backgroundPosition: '100% 50%',
          },
        },
        bounceGentle: {
          '0%, 100%': { 
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': { 
            transform: 'translateY(-10px)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
        twinkle: {
          '0%, 100%': { 
            opacity: '0.3', 
            transform: 'scale(0.8)',
          },
          '50%': { 
            opacity: '1', 
            transform: 'scale(1.2)',
          },
        },
        pulseMagical: {
          '0%, 100%': { 
            opacity: '1',
          },
          '50%': { 
            opacity: '0.7',
          },
        },
        wiggle: {
          '0%, 100%': { 
            transform: 'rotate(-3deg)',
          },
          '50%': { 
            transform: 'rotate(3deg)',
          },
        },
      },
      backdropBlur: {
        'xs': '2px',
      },
      aspectRatio: {
        'magical': '1 / 1',
        '4/3': '4 / 3',
        '16/9': '16 / 9',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
      scale: {
        '102': '1.02',
        '103': '1.03',
        '175': '1.75',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.875rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '3.5rem' }],
        '6xl': ['3.75rem', { lineHeight: '4.25rem' }],
        '7xl': ['4.5rem', { lineHeight: '5rem' }],
        '8xl': ['6rem', { lineHeight: '6.5rem' }],
        '9xl': ['8rem', { lineHeight: '8.5rem' }],
      },
      lineHeight: {
        '3': '.75rem',
        '4': '1rem',
        '5': '1.25rem',
        '6': '1.5rem',
        '7': '1.75rem',
        '8': '2rem',
        '9': '2.25rem',
        '10': '2.5rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
    },
  },
  plugins: [],
}