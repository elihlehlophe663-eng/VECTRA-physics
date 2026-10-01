/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        space: {
          900: '#04060d',
          800: '#070b16',
          700: '#0b1020',
          600: '#111728',
          500: '#1a2138',
          400: '#2a3450',
          300: '#3d4a6b',
        },
        star: {
          white: '#e8edf5',
          blue: '#9fb8e8',
          warm: '#f0e0c8',
        },
        nebula: {
          blue: '#2d4a7a',
          teal: '#1a4a55',
          rose: '#5a3a52',
        },
        accent: {
          cyan: '#5ec8d8',
          ice: '#a8d5e8',
          gold: '#e8c87a',
        },
        surface: {
          DEFAULT: 'rgba(17, 23, 40, 0.55)',
          hover: 'rgba(26, 33, 56, 0.7)',
          border: 'rgba(120, 150, 200, 0.12)',
          'border-hover': 'rgba(140, 180, 230, 0.25)',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'hero': ['clamp(2.75rem, 8vw, 6rem)', { lineHeight: '1.02', letterSpacing: '-0.03em', fontWeight: '600' }],
        'display': ['clamp(2rem, 5vw, 3.25rem)', { lineHeight: '1.08', letterSpacing: '-0.025em', fontWeight: '600' }],
        'section': ['clamp(1.5rem, 3vw, 2rem)', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '600' }],
        'eyebrow': ['0.75rem', { lineHeight: '1.2', letterSpacing: '0.22em', fontWeight: '500' }],
      },
      letterSpacing: {
        'widest-2': '0.18em',
      },
      animation: {
        'twinkle': 'twinkle 4s ease-in-out infinite',
        'drift': 'drift 60s linear infinite',
        'orbit-slow': 'orbit 40s linear infinite',
        'orbit-slower': 'orbit 80s linear infinite',
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
      },
      keyframes: {
        twinkle: {
          '0%, 100%': { opacity: '0.25' },
          '50%': { opacity: '1' },
        },
        drift: {
          '0%': { transform: 'translateY(0) translateX(0)' },
          '50%': { transform: 'translateY(-20px) translateX(10px)' },
          '100%': { transform: 'translateY(0) translateX(0)' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(var(--orbit-r)) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(var(--orbit-r)) rotate(-360deg)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '0.6', transform: 'scale(1.05)' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.9' },
        },
      },
    },
  },
  plugins: [],
};
