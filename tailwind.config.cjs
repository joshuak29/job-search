/** @type {import('tailwindcss').Config} */

const defaultTheme = import default ("tailwindcss/defaultTheme");

module.exports = {
  content: ["./index.html", "./src/**/*.{vue, js, ts}"], //this allows tailwind to work in all the mentioned files (index.html and all the files in the src and its child directories(**) which end with .vue/.js/.ts(*.{vue, js, ts}))
  theme: {
    extend: {       
      fontFamily: {  //fontFamily object in the defaultTheme
        sans: ["Open Sans", ...defaultTheme.fontFamily.sans] //put our preferred font in front of all the fonts in the sans array to make it the default
      }
    },
  },
  plugins: [],
};
