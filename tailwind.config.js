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
          DEFAULT: '#FBFBFA',
          pure: '#FFFFFF',
          subtle: '#F4F3EE',
          dark: '#EBE9E3',
        },
        ink: {
          DEFAULT: '#191817',
          light: '#2E2C29',
          pencil: '#45433E',
          muted: '#595650',
          faint: '#8C8982',
        },
        rule: {
          DEFAULT: '#E7E5E0',
          strong: '#D4D1C8',
        },
        aizome: {
          DEFAULT: '#1E2B37',
          hover: '#141E27',
          subtle: '#EDF1F5',
        },
        hanko: {
          DEFAULT: '#B93829',
          subtle: '#FDF2F0',
          border: '#F2C5C0',
        },
        matcha: {
          DEFAULT: '#2B6E48',
          subtle: '#F0F7F3',
          border: '#C0DFC9',
        },
        ochre: {
          DEFAULT: '#8A6421',
          subtle: '#FAF5EC',
        }
      },
      fontFamily: {
        sans: ['"Noto Sans JP"', '"Hiragino Sans"', '"Hiragino Kaku Gothic ProN"', '"Meiryo"', 'system-ui', 'sans-serif'],
        jp: ['"Noto Sans JP"', '"Hiragino Sans"', '"Hiragino Kaku Gothic ProN"', '"Meiryo"', 'sans-serif'],
        'serif-jp': ['"Noto Serif JP"', '"Shippori Mincho"', 'serif'],
      },
      boxShadow: {
        'paper-sm': '0 1px 2px rgba(25, 24, 23, 0.04)',
        'paper': '0 1px 3px rgba(25, 24, 23, 0.04), 0 8px 24px -4px rgba(25, 24, 23, 0.04)',
        'paper-lg': '0 2px 6px rgba(25, 24, 23, 0.05), 0 16px 36px -6px rgba(25, 24, 23, 0.06)',
      }
    },
  },
  plugins: [],
}
