/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
      },
      colors: {
        'rose-gold': '#E8B4B8',
        'soft-pink': '#F8E8E9',
        'blush': '#F5F0F0',
        'cream': '#FBF8F6',
        'gold': '#D4AF37',
        'warm-gray': '#6B7280',
        'deep-rose': '#C48B9F',
        'slate-dark': '#1E293B',
        'slate-light': '#F8FAFC',
        'primary': '#EC4899',
        'secondary': '#8B5CF6',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0px)'
          },
          '50%': {
            transform: 'translateY(-10px)'
          }
        }
      }
    },
  },
  plugins: [],
} 