/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary:      '#02C75A',
        primaryDark:  '#03B152',
        primaryLight: '#E8F8EE',
        primarySoft:  '#C0DD97',
        bg:           '#FAFAF9',
        bgCard:       '#FFFFFF',
        bgSoft:       '#F2F2F0',
        ink:          '#0A0A0A',
        inkSub:       '#565656',
        inkMute:      '#888780',
        line:         '#E5E5E3',
        consumer:     '#378ADD',
        consumerBg:   '#E6F1FB',
      },
      fontFamily: {
        sans: ["Inter", "'Pretendard Variable'", "Pretendard", "-apple-system", "'Apple SD Gothic Neo'", "system-ui", "sans-serif"],
        ko:   ["'Pretendard Variable'", "Pretendard", "-apple-system", "'Apple SD Gothic Neo'", "system-ui", "sans-serif"],
        num:  ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
