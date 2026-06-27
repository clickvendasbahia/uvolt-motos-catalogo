import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        graphite: '#0A0A0C',
        carbon: '#16171A',
        steel: '#1D1F23',
        slate: '#8A8D93',
        mist: '#F5F6F7',
        electric: '#3DA9FC',
        neon: '#7ED321',
        lime: '#A6F04A',
        flame: '#FF6B35',
        ember: '#FF9466',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'grid-fade':
          'radial-gradient(circle at 50% 0%, rgba(61,169,252,0.15), transparent 60%)',
      },
      boxShadow: {
        glow: '0 0 40px rgba(61,169,252,0.35)',
        'glow-lime': '0 0 40px rgba(166,240,74,0.3)',
      },
    },
  },
  plugins: [],
};

export default config;
