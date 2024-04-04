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
        mint: '#E7FFF8',
        aqua: '#BAF2D4',
        teal: '#359876',
        forest: '#10684A',
        darkgreen: '#06120E',
        whitegreen : '#DFE8E3',
        graygreen: '#C2CDC7',
        dustygreen: '#87908D'
      },
    },
  },
  daisyui: {
    themes: [
      'light',
      'dark',
      {
        lemonade: {
          ...require('daisyui/src/theming/themes')['lemonade'],
          "primary": '#10684A', 
          "primary-content": '#ffffff',
          "secondary": '#359876',
          "secondary-content": '#ffffff',
          "accent": '#359876',
          "accent-content": '#ffffff',
          '.shadow-primary': {
            'box-shadow': '0px 14px 60px 0px #3598761A',
          },
        },
      },
    ], // theme  of daisyui
  },
  plugins: [require('daisyui')],
}
export default config
