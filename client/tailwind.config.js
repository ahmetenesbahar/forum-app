/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        light: {
          primary: "#FF5700",
          secondary: "#46D0FF",
          background: "#DAE0E6",
          navBackground: "#FFFFFF",
          text: "#333333",
        },
        dark: {
          primary: "#FF4500",
          secondary: " #0079D3",
          background: "#000",
          navBackground: "#1A1A1B",
          text: "#FFFFFF",
        },
      },
    },
  },
  plugins: [],
};
