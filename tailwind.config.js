const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{html,js,tsx,ts}", "./src/styles/**/*.css"],
  theme: {
    extend: {
      colors: {
        lime: colors.lime,
      },
    },
  },
  plugins: [],
};
