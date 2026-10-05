import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Paper and ink: the site chrome is monochrome so the only saturated pixels belong to the work.
        paper: { DEFAULT: '#F1F1EE', raised: '#F8F8F6', sunk: '#E8E8E4' },
        ink: { DEFAULT: '#111110', soft: '#2A2A28' },
        muted: '#6B6A65',
        line: { DEFAULT: '#D9D8D2', strong: '#BDBCB5' },
        night: { DEFAULT: '#0E0E0D', raised: '#191917', line: '#2C2C29', muted: '#8E8D87' },
        signal: '#FFFF77',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
      },
      fontSize: {
        display: ['clamp(2.75rem, 1.4rem + 5vw, 6.75rem)', { lineHeight: '0.94', letterSpacing: '-0.045em' }],
        title: ['clamp(2.125rem, 1.3rem + 2.8vw, 4rem)', { lineHeight: '1', letterSpacing: '-0.035em' }],
        heading: ['clamp(1.5rem, 1.15rem + 1.1vw, 2.25rem)', { lineHeight: '1.08', letterSpacing: '-0.025em' }],
        lead: ['clamp(1.125rem, 1rem + 0.45vw, 1.4375rem)', { lineHeight: '1.42', letterSpacing: '-0.012em' }],
        body: ['1rem', { lineHeight: '1.6' }],
        small: ['0.875rem', { lineHeight: '1.5' }],
        label: ['0.75rem', { lineHeight: '1.35', letterSpacing: '0.01em' }],
      },
      maxWidth: {
        site: '95rem',
        prose: '38rem',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.16, 1, 0.3, 1)',
        quiet: 'cubic-bezier(0.2, 0.7, 0.2, 1)',
      },
      keyframes: {
        rise: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'draw-x': {
          from: { transform: 'scaleX(0)' },
          to: { transform: 'scaleX(1)' },
        },
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
      },
      animation: {
        rise: 'rise 0.9s cubic-bezier(0.2, 0.7, 0.2, 1) both',
        'draw-x': 'draw-x 1.2s cubic-bezier(0.16, 1, 0.3, 1) both',
        blink: 'blink 1.05s steps(1) infinite',
      },
    },
  },
  plugins: [],
}

export default config
