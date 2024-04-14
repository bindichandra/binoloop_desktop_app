/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  corePlugins: {
    preflight: false,
  },
  prefix: "tw-",
  important: true,
  theme: {
    extend: {
      colors: {
        gray: "#fafafc",
        lightgray: "#d0d3da",
        white: "#fff",
        teal: "#0EDEF9",
        whitesmoke: {
          "100": "#f5f5f5",
          "200": "#eee",
          "300": "#ebebeb",
        },
        mediumseagreen: {
          "100": "#0cc96e",
          "200": "rgba(12, 201, 110, 0.2)",
        },
        blue: {
          "100": "#4c7eff",
          "200": "rgba(76, 126, 255, 0.2)",
          "500": "#477FFD",
        },
        crimson: {
          "100": "#ff004d",
          "200": "rgba(255, 0, 77, 0.2)",
        },
        darkorange: {
          "100": "#ff9c29",
          "200": "rgba(255, 156, 41, 0.2)",
        },
        black: "#131313",
        grey: "#6e6e78",
      },
      spacing: {},
      fontFamily: {
        "satoshi-variable": "'Satoshi Variable'",
        poppins: "Poppins",
      },
      borderRadius: {
        "8xs": "5px",
        "3xs": "10px",
        "24xl": "43px",
      },
    },
    fontSize: {
      base: "16px",
      xs: "12px",
      lg: "18px",
      22: "22px",
      xl: "24px",
      "2xl": "28px",
      "3xl": "32px",
      "4xl": "36px",
      "5xl": "40px",
      "6xl": "44px",
      "7xl": "48px",
    },
  },
};
