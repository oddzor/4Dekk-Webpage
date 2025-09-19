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
        primary: '#1a1a2e',
        secondary: '#8B0000',
        accent: '#FFD700',
        background: '#0f0f23',
        text: '#e0e0e0',
        headings: '#ffffff',
        'primary-light': '#2d2d4a',
        'secondary-light': '#a52a2a',
        'accent-dark': '#b8860b',
        'gray-dark': '#1a1a1a',
        'gray-darker': '#0a0a0a'
      },
      fontFamily: {
        'body': ['var(--font-roboto)', 'sans-serif'],
        'headings': ['var(--font-oswald)', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
} 