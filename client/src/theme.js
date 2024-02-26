export const getTheme = (mode) => {
  if (mode === "light") {
    return {
      primary: "bg-light-primary",
      secondary: "bg-light-secondary",
      background: "bg-light-background",
      navBackground: "bg-light-navBackground",
      text: "text-light-text",
    };
  } else {
    return {
      primary: "bg-dark-primary",
      secondary: "bg-dark-secondary",
      background: "bg-dark-background",
      navBackground: "bg-dark-navBackground",
      text: "text-dark-text",
    };
  }
};
