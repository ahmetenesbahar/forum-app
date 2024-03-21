import React from "react";
import { useTheme } from "./contexts/ThemeContext";

const Sidebar = () => {
  const { theme } = useTheme();
  return <div className={`${theme.borderGray} border-r-2 w-1/6`}></div>;
};

export default Sidebar;
