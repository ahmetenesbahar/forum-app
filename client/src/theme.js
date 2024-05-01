export const getTheme = (mode) => {
  if (mode === "light") {
    return {
      primary: "bg-light-primary",
      secondary: "bg-light-secondary",
      background: "bg-light-background",
      secondaryBackground: "!bg-light-secondaryBackground",
      text: "!text-light-text",
      logo: "text-black",
      borderGray: "border-light-borderGray",
      grayBackground: "bg-light-borderGray",
      hoverBackground: "hover:bg-light-hoverBackground",
      primaryBorder: "border-light-primary",
      hoverBlue: "hover:bg-light-hoverBlue",
      upVote: "bg-light-upVote",
      downVote: "bg-light-downVote",
    };
  } else {
    return {
      primary: "bg-dark-primary",
      secondary: "bg-dark-secondary",
      background: "bg-dark-background",
      secondaryBackground: "!bg-dark-secondaryBackground",
      text: "!text-dark-text",
      logo: "text-white",
      borderGray: "border-dark-borderGray",
      grayBackground: "bg-dark-borderGray",
      hoverBackground: "hover:bg-dark-hoverBackground",
      primaryBorder: "border-dark-primary",
      hoverBlue: "hover:bg-dark-hoverBlue",
      upVote: "bg-dark-upVote",
      downVote: "bg-dark-downVote",
    };
  }
};

export const getThemeReactSelect = (mode) => {
  if (mode === "light") {
    return {
      primary: "#FF5700",
      secondary: "#33A1FF",
      background: "#FFFFFF",
      secondaryBackground: "#eaedef",
      borderGray: "#c0c0c0",
      hoverBackground: "#f5f5f5",
      hoverBlue: "#1E90FF",
      text: "#333333",
    };
  } else {
    return {
      primary: "#FF4500",
      secondary: " #0079D3",
      background: "#0b1416",
      secondaryBackground: "#1a282d ",
      borderGray: "#373c3f",
      hoverBackground: " #2c3e44",
      hoverBlue: "#66a3e0",
      text: "#FFFFFF",
    };
  }
};
