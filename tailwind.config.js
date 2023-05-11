/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "light-blue": "#47DAFF",
        "strong-purple-pink": "#C058F3",
        "light-purple-pink": "#CE8EF8",
        "very-dark-blue": "#161722",
        "very-dark-desaturated-blue": "#25273C",
        "light-grayish-blue": "#CACDE8",
        "light-grayish-blue-hover": "#E4E5F1",
        "dark-grayish-blue": "#777A92",
        "very-dark-grayish-blue": "#4D5066",
        "very-dark-bluish-gray": "#393A4C",
      },
      fontFamily: {
        "josefin-sans": ["'Josefin Sans', sans-serif"],
      },
      container: {
        center: true,
      },
      boxShadow: {
        custom: "0 10px 50px 0 rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};
