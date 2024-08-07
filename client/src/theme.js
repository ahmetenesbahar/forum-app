import { hover } from "@testing-library/user-event/dist/hover";

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
      secondaryHoverBackground: "hover:bg-light-secondaryHoverBackground",
      primaryBorder: "border-light-primary",
      hoverBlue: "hover:bg-light-hoverBlue",
      upVote: "hover:text-light-upVote",
      downVote: "hover:text-light-downVote",
      upVoteBackground: "bg-light-upVote",
      downVoteBackground: "bg-light-downVote",
      hoverPrimary: "hover:bg-light-upVote",
      hoverDownVote: "hover:bg-light-hoverDownVote",
      hoverUpVote: "hover:bg-light-hoverUpVote",
      activeBackground: "active:bg-light-activeBackground",
      scrollbarThumb: "scrollbar-thumb-[#FF5700]",
      scrollbarTrack: "scrollbar-track-[#c0c0c0]",
      boxBackground: "bg-light-boxBackground",
      boxText: "text-light-boxText",
      boxScrollbarThumb: "scrollbar-thumb-[#c0c0c0]",
      boxScrollbarTrack: "scrollbar-track-[#F9FAFA]",
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
      secondaryHoverBackground: "hover:bg-dark-secondaryHoverBackground",
      primaryBorder: "border-dark-primary",
      hoverBlue: "hover:bg-dark-hoverBlue",
      upVote: "hover:text-dark-upVote",
      downVote: "hover:text-dark-downVote",
      upVoteBackground: "bg-dark-upVote",
      downVoteBackground: "bg-dark-downVote",
      hoverDownVote: "hover:bg-dark-hoverDownVote",
      hoverUpVote: "hover:bg-dark-hoverUpVote",
      activeBackground: "active:bg-dark-activeBackground",
      scrollbarThumb: "scrollbar-thumb-[#FF4500]",
      scrollbarTrack: "scrollbar-track-[#1a282d]",
      boxBackground: "bg-dark-boxBackground",
      boxText: "text-dark-boxText",
      boxScrollbarThumb: "scrollbar-thumb-[#202020]",
      boxScrollbarTrack: "scrollbar-track-[#04090A]",
      hoverPrimary: "hover:bg-light-upVote",
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
