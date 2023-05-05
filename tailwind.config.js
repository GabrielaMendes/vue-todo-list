/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "very-dark-blue": "#161722",
        "very-dark-desaturated-blue": "#25273C",
        "light-grayish-blue": "#CACDE8",
        "light-grayish-blue-hover": "hsl(236, 33%, 92%)",
        "dark-grayish-blue": "#E4E5F1",
        "very-dark-grayish-blue": "#4D5066",
        "very-dark-bluish-gray": "#393A4C",
      },
      fontFamily: {
        "josefin-sans": ["'Josefin Sans', sans-serif"]
      },
      container: {
        center: true,
      },
    },
  },
  plugins: [],
};
