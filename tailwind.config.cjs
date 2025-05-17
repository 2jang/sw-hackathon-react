/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretendard-Regular', 'sans-serif'],
      },
    },
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '970px', // 이 값을 980px로 변경 또는 추가
      'lgg' : '1075px',
      'xl': '1280px',
      'xll' : '1480px',
      '2xl': '1536px',
      // 기존에 다른 커스텀 screen 설정이 있었다면 유지해야 합니다.
    },
  },
  plugins: [],
});