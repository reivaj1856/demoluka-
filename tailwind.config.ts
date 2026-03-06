import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#0B0B14',
          900: '#0B0B14',
          850: '#0F1020',
          800: '#12132A',
        },
        primary: {
          DEFAULT: '#5B21B6',
          700: '#5B21B6',
          600: '#6D28D9',
          500: '#7C3AED',
          400: '#8B5CF6',
        },
        surface: {
          DEFAULT: '#111327',
          2: '#15183A',
          3: '#1B1F4A',
        },
        border: '#23285C',
        text: {
          DEFAULT: '#E9E8FF',
          muted: '#B9B7E6',
        },
        success: '#22C55E',
        warning: '#F59E0B',
        danger: '#EF4444',
      },
      boxShadow: {
        card: '0 10px 30px rgba(0,0,0,0.35)',
      },
    },
  },
  plugins: [],
}

export default config
