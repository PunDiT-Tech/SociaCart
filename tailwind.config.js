/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body:    ['DM Sans', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
      },
      colors: {
        brand: {
          green:  '#25D366',
          dark:   '#1DA851',
          teal:   '#128C7E',
          coral:  '#FF6B35',
          gold:   '#F5C518',
          ink:    '#1A1A2E',
        },
      },
      backgroundImage: {
        'hero':    'linear-gradient(135deg, #25D366 0%, #128C7E 40%, #0D4F47 100%)',
        'hero-r':  'linear-gradient(315deg, #25D366 0%, #128C7E 40%, #0D4F47 100%)',
        'card-overlay': 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.72) 100%)',
        'shimmer': 'linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%)',
        'shimmer-dark': 'linear-gradient(90deg, #1c1c26 25%, #232330 50%, #1c1c26 75%)',
      },
      animation: {
        shimmer:    'shimmer 1.6s infinite linear',
        float:      'float 3.5s ease-in-out infinite',
        blob:       'blob 8s infinite ease-in-out',
        'fade-in':  'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.35s ease-out',
        'ping-slow':'ping 2.5s cubic-bezier(0,0,0.2,1) infinite',
      },
      keyframes: {
        shimmer: {
          '0%':   { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%':     { transform: 'translateY(-10px)' },
        },
        blob: {
          '0%,100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '50%':     { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
        },
        fadeIn:  { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp: { from: { transform: 'translateY(20px)', opacity: 0 }, to: { transform: 'translateY(0)', opacity: 1 } },
      },
      backdropBlur: { xs: '2px' },
      boxShadow: {
        'glow-green': '0 0 24px rgba(37,211,102,0.35)',
        'glow-teal':  '0 0 24px rgba(18,140,126,0.35)',
        'card':       '0 4px 16px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)',
        'card-hover': '0 12px 36px rgba(0,0,0,0.10), 0 4px 12px rgba(0,0,0,0.06)',
      },
    },
  },
  plugins: [],
};
