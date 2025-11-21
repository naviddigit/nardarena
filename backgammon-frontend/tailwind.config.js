/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable dark mode with class strategy
  theme: {
    extend: {
      colors: {
        // Custom colors for themes
        dark: {
          bg: '#0f0f12',
          surface: '#1a1a1f',
          border: 'rgba(255, 255, 255, 0.1)',
        },
        light: {
          bg: '#ffffff',
          surface: '#f5f5f5',
          border: '#e5e5e5',
        },
        gaming: {
          bg: '#0a0a12',
          surface: '#1b0f3d',
          border: 'rgba(168, 85, 247, 0.3)',
        },
        primary: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7', // Main purple
          600: '#9333ea',
          700: '#7e22ce',
          800: '#6b21a8',
          900: '#581c87',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        handwritten: ['Pacifico', 'cursive'],
      },
      animation: {
        'spin-slow': 'spin 60s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      boxShadow: {
        'glow-purple': '0 0 40px rgba(135, 70, 255, 0.25)',
        'glow-purple-lg': '0 0 60px rgba(135, 70, 255, 0.4)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}