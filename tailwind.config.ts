import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      white: '#FFFFFF',
      black: '#000000',
      transparent: '#00000000',
      gray: {
        50: '#F9FAFB',
        100: '#F2F4F6',
        300: '#CBD0D5',
        500: '#838991',
        700: '#565C64',
        900: '#192028',
      },
      primary: {
        50: '#F8F2EA',
        100: '#FFEDE9',
        300: '#FF896F',
        500: '#FF4A22',
      },
      system: {
        kakaoYellow: '#FAE100',
        kakaoBrown: '#371D1E',
        error: '#FF2A2A',
        dim60: 'rgba(0, 0, 0, 0.60)',
        dim80: 'rgba(0, 0, 0, 0.80)',
      },
    },
    zIndex: {
      body: '0',
      above: '10',
      fixedBody: '50',
      header: '900',
      nav: '1000',
      floating: '9000',
      overlay: '10000',
      toast: '30000',
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-nanum-square-round)'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'white-gradient':
          'linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 1))',
        'top-fade':
          'linear-gradient(to bottom, rgba(0,0,0,0.6) 60%, transparent)',
      },
      boxShadow: {
        floating: '0px 4px 15.4px 0px rgba(0, 0, 0, 0.25);',
        pin: '0px 4px 4px rgba(0, 0, 0, 0.25);',
        search: '0px 4px 8px 0px rgba(0, 0, 0, 0.10);',
      },
      textShadow: {
        stroke:
          '0.5px 0.5px 0 white, -0.5px 0.5px 0 white, -0.5px -0.5px 0 white, 0.5px -0.5px 0 white',
      },
    },
  },
  plugins: [
    plugin(({ addUtilities, e }) => {
      addUtilities({
        [`.${e('?')}`]: {
          animation: `${e('?')}wobble 0.5s ease-in-out alternate infinite`,
        },
        [`@keyframes ${e('?')}wobble`]: {
          '0%': {
            'box-shadow':
              'inset 4px 4px rgb(236, 15, 170), inset -4px -4px rgb(236, 15, 170)',
          },
          '100%': {
            'box-shadow':
              'inset 8px 8px rgb(236, 15, 170), inset -8px -8px rgb(236, 15, 170)',
          },
        },
      });
    }),
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') },
      );
    }),
  ],
};
export default config;
