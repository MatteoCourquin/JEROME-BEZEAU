import type { Config } from 'tailwindcss';

const defaultScaping = {
  'x-default': 'clamp(20px, 8vw, 100px)',
  'y-default': 'clamp(20px, 8vh, 100px)',
};

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        black: '#0e0e0e',
        white: '#ffffff',
        'white-80': '#ffffffcc',
        'white-40': '#ffffff66',
        'white-12': '#ffffff1f',
      },
      padding: {
        ...defaultScaping,
      },
      margin: {
        ...defaultScaping,
      },
      width: {
        ...defaultScaping,
      },
      height: {
        ...defaultScaping,
      },
      inset: {
        ...defaultScaping,
      },
    },
  },
  plugins: [],
};
export default config;
