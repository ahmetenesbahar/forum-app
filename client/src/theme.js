export const getTheme = (mode) => {
  if (mode === "light") {
    return {
      primary: "bg-light-primary",
      secondary: "bg-light-secondary",
      background: "bg-light-background",
      secondaryBackground: "bg-light-secondaryBackground",
      text: "!text-light-text",
      logo: "text-black",
      borderGray: "border-light-borderGray",
      hoverBackground: "hover:bg-light-hoverBackground",
      primaryBorder: "border-light-primary",
    };
  } else {
    return {
      primary: "bg-dark-primary",
      secondary: "bg-dark-secondary",
      background: "bg-dark-background",
      secondaryBackground: "bg-dark-secondaryBackground",
      text: "!text-dark-text",
      logo: "text-white",
      borderGray: "border-dark-borderGray",
      hoverBackground: "hover:bg-dark-hoverBackground",
      primaryBorder: "border-dark-primary",
    };
  }
};
