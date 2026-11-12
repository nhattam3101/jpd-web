/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: '#EAE7D6',
          pure: '#F9FAF4',
          subtle: '#E2E8D9',
          dark: '#D5D8C8',
        },
        ink: {
          DEFAULT: '#23342E',
          light: '#344A42',
          pencil: '#465D54',
          muted: '#60736B',
          faint: '#7D8D86',
        },
        rule: {
          DEFAULT: '#C8D2C1',
          strong: '#A7B8A5',
        },
        aizome: {
          DEFAULT: '#5D7B6F',
          hover: '#496459',
          subtle: '#DDE8DD',
        },
        hanko: {
          DEFAULT: '#A34E46',
          subtle: '#F5E4DD',
          border: '#DDB9AE',
        },
        matcha: {
          DEFAULT: '#456B59',
          subtle: '#DCEBD9',
          border: '#A4C3A2',
        },
        ochre: {
          DEFAULT: '#79652F',
          subtle: '#F2ECD4',
        },
        sage: {
          DEFAULT: '#A4C3A2',
          soft: '#D9E7D6',
        },
        mint: {
          DEFAULT: '#B0D4B8',
          soft: '#DDEEE0',
        },
        aqua: {
          DEFAULT: '#D7F9FA',
          soft: '#E9FBFB',
        },
      },
      fontFamily: {
        sans: ['"Noto Sans JP"', '"Hiragino Sans"', '"Hiragino Kaku Gothic ProN"', '"Meiryo"', 'system-ui', 'sans-serif'],
        jp: ['"Noto Sans JP"', '"Hiragino Sans"', '"Hiragino Kaku Gothic ProN"', '"Meiryo"', 'sans-serif'],
        'serif-jp': ['"Noto Serif JP"', '"Shippori Mincho"', 'serif'],
      },
      boxShadow: {
        'paper-sm': '0 2px 8px rgba(55, 77, 67, 0.08)',
        'paper': '0 8px 24px -12px rgba(55, 77, 67, 0.24)',
        'paper-lg': '0 18px 44px -20px rgba(55, 77, 67, 0.38)',
      }
    },
  },
  plugins: [],
}
