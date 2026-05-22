/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        koahYellow: "#FFD700",
        koahGreen: "#A2CD5A",
        koahPurple: "#9370DB",
        koahPink: "#FFB6C1",
        // 새로 사용할 메인 컬러(종려나무 반의 기본 브랜드 컬러)
        koahPrimary: "#2E7D32",
      },
      fontFamily: {
        kor: ["Pretendard", "sans-serif"],
        eng: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
}
