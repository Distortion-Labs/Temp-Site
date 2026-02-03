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
        // Primary - Electric violet with depth
        primary: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7e22ce',
          800: '#6b21a8',
          900: '#581c87',
          950: '#3b0764',
        },
        // Accent - Luminous cyan for refractive highlights
        cyan: {
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
        // Rose accent for warmth
        rose: {
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
        },
        // Glass palette
        glass: {
          white: 'rgba(255, 255, 255, 0.06)',
          'white-8': 'rgba(255, 255, 255, 0.08)',
          'white-12': 'rgba(255, 255, 255, 0.12)',
          'white-16': 'rgba(255, 255, 255, 0.16)',
          border: 'rgba(255, 255, 255, 0.1)',
          'border-light': 'rgba(255, 255, 255, 0.15)',
        },
        // Deep space backgrounds
        void: {
          DEFAULT: '#050208',
          50: '#0a0510',
          100: '#0d0714',
          200: '#120a1c',
          300: '#1a0f2e',
        },
      },
      fontFamily: {
        // Distinctive display font
        display: ['var(--font-outfit)', 'system-ui', 'sans-serif'],
        // Clean body font
        sans: ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
        // Monospace for code/technical
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      fontSize: {
        // Fluid typography scale
        'display-xl': ['clamp(3rem, 8vw, 6rem)', { lineHeight: '1', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2.5rem, 6vw, 4.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(2rem, 4vw, 3rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'body-lg': ['1.125rem', { lineHeight: '1.7' }],
        'body': ['1rem', { lineHeight: '1.7' }],
        'body-sm': ['0.875rem', { lineHeight: '1.6' }],
      },
      backgroundImage: {
        // Cosmic mesh gradient
        'mesh': `
          radial-gradient(ellipse 80% 50% at 20% -20%, rgba(120, 80, 255, 0.25), transparent),
          radial-gradient(ellipse 60% 40% at 80% 0%, rgba(6, 182, 212, 0.2), transparent),
          radial-gradient(ellipse 50% 30% at 10% 60%, rgba(244, 63, 94, 0.12), transparent),
          radial-gradient(ellipse 40% 50% at 90% 80%, rgba(120, 80, 255, 0.15), transparent)
        `,
        // Glass refraction gradient
        'refraction': 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.02) 50%, rgba(255,255,255,0.08) 100%)',
        // Shimmer effect
        'shimmer': 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
        'glass-hover': '0 16px 48px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255,255,255,0.15)',
        'glow-purple': '0 0 60px -12px rgba(168, 85, 247, 0.5)',
        'glow-cyan': '0 0 60px -12px rgba(6, 182, 212, 0.5)',
        'glow-rose': '0 0 60px -12px rgba(244, 63, 94, 0.4)',
        'inner-shine': 'inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -1px 0 rgba(0,0,0,0.1)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out infinite 2s',
        'float-slow': 'float 8s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s ease-in-out infinite',
        'morph': 'morph 8s ease-in-out infinite',
        'spin-slow': 'spin 25s linear infinite',
        'gradient-shift': 'gradient-shift 6s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(2deg)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        morph: {
          '0%, 100%': { borderRadius: '60% 40% 30% 70%/60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 60% 70% 40%/50% 60% 30% 60%' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
    },
  },
  plugins: [],
}

export default config
