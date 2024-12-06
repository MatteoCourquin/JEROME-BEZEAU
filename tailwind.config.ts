import type { Config } from 'tailwindcss';

export enum BREAKPOINTS {
  XS = 400,
  SM = 640,
  MD = 768,
  LG = 1024,
}

export const defaultSpacingDouble = {
  'x-double-default': 'clamp(30px, 12vw, 150px)',
  'y-double-default': 'clamp(30px, 12vh, 150px)',
};

export const defaultSpacing = {
  'x-default': 'clamp(20px, 8vw, 100px)',
  'y-default': 'clamp(20px, 8vh, 100px)',
};

const defaultSpacingHalf = {
  'x-half-default': 'clamp(10px, 4vw, 50px)',
  'y-half-default': 'clamp(10px, 4vh, 50px)',
};

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        xs: `${BREAKPOINTS.XS}px`,
        sm: `${BREAKPOINTS.SM}px`,
        md: `${BREAKPOINTS.MD}px`,
        lg: `${BREAKPOINTS.LG}px`,
      },
      colors: {
        black: '#0e0e0e',
        green: '#27FF56',
        white: '#ffffff',
        'white-80': '#ffffffcc',
        'white-40': '#ffffff66',
        'white-12': '#ffffff1f',
      },
      padding: {
        ...defaultSpacing,
        ...defaultSpacingHalf,
        ...defaultSpacingDouble,
        header: '100px',
      },
      margin: {
        ...defaultSpacing,
        ...defaultSpacingHalf,
        ...defaultSpacingDouble,
      },
      width: {
        ...defaultSpacing,
        ...defaultSpacingHalf,
        ...defaultSpacingDouble,
      },
      height: {
        ...defaultSpacing,
        ...defaultSpacingHalf,
        ...defaultSpacingDouble,
      },
      inset: {
        ...defaultSpacing,
        ...defaultSpacingHalf,
        ...defaultSpacingDouble,
      },
      gap: {
        ...defaultSpacing,
        ...defaultSpacingHalf,
        ...defaultSpacingDouble,
      },
    },
  },
  safelist: [
    'lg:col-span-3',
    'lg:col-span-4',
    'lg:col-span-5',
    'lg:col-start-1',
    'lg:col-start-4',
    'lg:col-start-8',
    'lg:col-start-9',
    'lg:origin-top-right',
    'lg:origin-top-left',
    'origin-top-right',
    'origin-top-left',
    'grid-cols-4',
    'grid-cols-6',
    'grid-cols-12',
  ],
  plugins: [],
};
export default config;
