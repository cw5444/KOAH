/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        koahYellow: "#FFD700",
        koahGreen: "#A2CD5A",
        koahPurple: "#9370DB",
        koahPink: "#FFB6C1",
      },
      fontFamily: {
        kor: ["Pretendard", "sans-serif"],
        eng: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
}
