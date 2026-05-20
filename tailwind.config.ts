import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#020408',
        'bg-secondary': '#0a0f1a',
        'bg-card': '#0d1424',
        'accent-green': '#00ff88',
        'accent-cyan': '#00d4ff',
        'accent-red': '#ff3366',
        'text-primary': '#e2e8f0',
        'text-muted': '#4a5568',
        'border-neon': '#1a2540',
      },
      fontFamily: {
        mono: ['var(--font-mono)', 'monospace'],
        display: ['var(--font-display)', 'sans-serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-green': '0 0 20px rgba(0,255,136,0.3)',
        'glow-cyan': '0 0 20px rgba(0,212,255,0.3)',
        'glow-red': '0 0 20px rgba(255,51,102,0.3)',
      },
      animation: {
        'blink': 'blink 1s step-end infinite',
        'glitch': 'glitch 2.5s infinite',
        'scanline': 'scanline 8s linear infinite',
        'bounce-slow': 'bounce 2s infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      keyframes: {
        blink: { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0' } },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0,255,136,0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(0,255,136,0.6)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        glitch: {
          '0%, 100%': { clipPath: 'inset(0 0 0 0)', transform: 'translate(0)' },
          '20%': { clipPath: 'inset(20% 0 60% 0)', transform: 'translate(-2px, 2px)' },
          '40%': { clipPath: 'inset(60% 0 20% 0)', transform: 'translate(2px, -2px)' },
          '60%': { clipPath: 'inset(40% 0 40% 0)', transform: 'translate(-1px, 1px)' },
          '80%': { clipPath: 'inset(10% 0 80% 0)', transform: 'translate(1px, -1px)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;