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
        primary: '#1a1a2e',    // Very dark blue-gray for trust and sophistication
        secondary: '#8B0000',  // Dark red for energy and urgency
        accent: '#FFD700',     // Gold for highlights and CTAs
        background: '#0f0f23', // Very dark background
        text: '#e0e0e0',       // Light gray for readability
        headings: '#ffffff',    // White for bold headings
        'primary-light': '#2d2d4a', // Lighter variant of primary
        'secondary-light': '#a52a2a', // Lighter variant of secondary
        'accent-dark': '#b8860b', // Darker variant of accent
        'gray-dark': '#1a1a1a', // Dark gray for sections
        'gray-darker': '#0a0a0a', // Very dark gray
      },
      fontFamily: {
        'body': ['Roboto', 'sans-serif'],
        'headings': ['Oswald', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
} 