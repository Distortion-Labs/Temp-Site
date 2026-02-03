import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary palette - ethereal purples and blues
        primary: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
        // Accent - vibrant cyan
        accent: {
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
        },
        // Glass colors
        glass: {
          white: 'rgba(255, 255, 255, 0.08)',
          'white-10': 'rgba(255, 255, 255, 0.1)',
          'white-15': 'rgba(255, 255, 255, 0.15)',
          'white-20': 'rgba(255, 255, 255, 0.2)',
          border: 'rgba(255, 255, 255, 0.12)',
          'border-light': 'rgba(255, 255, 255, 0.18)',
        },
        // Dark background
        dark: {
          950: '#030014',
          900: '#0a0118',
          800: '#110827',
          700: '#1a1040',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
        'glow-gradient': 'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
        'mesh-gradient': `
          radial-gradient(at 40% 20%, rgba(139, 92, 246, 0.3) 0px, transparent 50%),
          radial-gradient(at 80% 0%, rgba(6, 182, 212, 0.25) 0px, transparent 50%),
          radial-gradient(at 0% 50%, rgba(139, 92, 246, 0.2) 0px, transparent 50%),
          radial-gradient(at 80% 50%, rgba(6, 182, 212, 0.15) 0px, transparent 50%),
          radial-gradient(at 0% 100%, rgba(139, 92, 246, 0.25) 0px, transparent 50%),
          radial-gradient(at 80% 100%, rgba(6, 182, 212, 0.2) 0px, transparent 50%)
        `,
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.36)',
        'glass-sm': '0 4px 16px 0 rgba(0, 0, 0, 0.25)',
        'glass-lg': '0 16px 48px 0 rgba(0, 0, 0, 0.4)',
        'glow': '0 0 40px rgba(139, 92, 246, 0.3)',
        'glow-sm': '0 0 20px rgba(139, 92, 246, 0.2)',
        'glow-accent': '0 0 40px rgba(6, 182, 212, 0.3)',
        'inner-glow': 'inset 0 1px 1px rgba(255, 255, 255, 0.1)',
      },
      backdropBlur: {
        'glass': '20px',
        'glass-lg': '40px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-slower': 'float 10s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'gradient': 'gradient 8s linear infinite',
        'blob': 'blob 7s infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        glow: {
          '0%': { opacity: '0.5' },
          '100%': { opacity: '1' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
    },
  },
  plugins: [],
}

export default config
