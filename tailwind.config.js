/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts}"],
  theme: {
    extend: {
      //allows us to extend the functionality of tailwind
      fontFamily: {
        sans: ["Open Sans", ...defaultTheme.fontFamily.sans], //we add the Open Sans font from google fonts to the front of the sans fonts in tailwind to make it the default
      },
      colors: {
        //add colors and tailwind will automatically add it to ist colors and will be available for bg, etc
        "brand-gray-1": "#dadce8",
        "brand-blue-1": "#1967d2",
        "brand-green-1": "#137333", //tailwind will create all the relative classes for the above colors
      },
    },
  },
  plugins: [],
};
