module.exports = {
  purge: [],
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      margin: {
        18: "75px",
        5.5: "22px",
        5.6: "23px",
      },
      colors: {
        harlequin: "#008200",
      },
      padding: {
        1.2: "0.30rem",
      },
      height: {
        88: "342px",
        71: "70%",
        74: "71%",
        0.1: "1px",
      },
      maxWidth: {
        xxs: "18rem",
      },
      width: {
        0.1: "0.5px",
        600: "600px",
        100: "100px",
        79: "318px",
        71: "70%",
        74: "71%",
        75: "72%",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
