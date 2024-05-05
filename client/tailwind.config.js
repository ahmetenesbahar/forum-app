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
          hoverBackground: "#F2F4F5",
          secondaryHoverBackground: "#E2E7E9",
          activeBackground: "#D2DADD",
          hoverBlue: "#1E90FF",
          downVote: "#6A5CFF",
          upVote: "#D93A00",
          text: "#333333",
          boxBackground: "#F9FAFA",
        },
        dark: {
          primary: "#FF4500",
          secondary: " #0079D3",
          background: "#0b1416",
          secondaryBackground: "#1a282d ",
          borderGray: "#373c3f",
          hoverBackground: "#131F23 ",
          secondaryHoverBackground: "#223237",
          activeBackground: "#33464C",
          hoverBlue: "#66a3e0",
          downVote: "#6A5CFF",
          upVote: "#D93A00",
          text: "#FFFFFF",
          boxBackground: "#04090A",
        },
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar")({ preferredStrategy: "pseudoelements" }),
  ],
};
