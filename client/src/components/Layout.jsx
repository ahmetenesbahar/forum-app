import React from "react";
import Sidebar from "./Sidebar";
import Main from "./Main";
import { useTheme } from "./contexts/ThemeContext";

const Page = () => {
  const { theme } = useTheme();
  return (
    <div className="flex">
      <Sidebar />
      <Main />
    </div>
  );
};

Page.displayName = "Page";
export default Page;
