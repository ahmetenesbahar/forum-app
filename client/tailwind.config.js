/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        light: {
          primary: "#FF5700",
          secondary: "#33A1FF",
          background: "#FFFFFF",
          secondaryBackground: "#eaedef",
          borderGray: "#c0c0c0",
          hoverBackground: "#f5f5f5",
          hoverBlue: "#1E90FF",
          text: "#333333",
        },
        dark: {
          primary: "#FF4500",
          secondary: " #0079D3",
          background: "#0b1416",
          secondaryBackground: "#1a282d ",
          borderGray: "#373c3f",
          hoverBackground: " #2c3e44",
          hoverBlue: "#66a3e0",
          text: "#FFFFFF",
        },
      },
    },
  },
  plugins: [],
};
