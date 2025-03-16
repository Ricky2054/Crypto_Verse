/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    'bg-card-background',
    'text-foreground',
    'text-text-gray',
    'text-success',
    'text-error',
    'border-gray-800',
    'hover:bg-background',
    'bg-background'
  ],
  theme: {
    extend: {
      colors: {
        background: '#0F1116',
        'card-background': '#1A1D24',
        foreground: '#FFFFFF',
        card: '#1E1E1E',
        'primary-cyan': '#30D5C8',
        'primary-purple': '#9966FF',
        success: '#00E676',
        error: '#FF5252',
        'text-white': '#FFFFFF',
        'text-gray': '#A0A8B8',
        gray: {
          700: '#374151',
          800: '#1F2937',
        },
        blue: {
          500: '#3B82F6',
          600: '#2563EB',
        },
        purple: {
          600: '#9333EA',
          700: '#7E22CE',
        },
        green: {
          500: '#22C55E',
        },
        red: {
          500: '#EF4444',
        },
        yellow: {
          500: '#F59E0B',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to right, #30D5C8, #9966FF)',
      },
      borderRadius: {
        DEFAULT: '8px',
      },
    },
  },
  plugins: [],
} 