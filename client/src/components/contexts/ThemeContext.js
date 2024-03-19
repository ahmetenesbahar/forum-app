import React, { createContext, useState, useContext } from "react";
import { useSelector } from "react-redux";
import { getTheme } from "theme";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const mode = useSelector((state) => state.mode);
  const theme = getTheme(mode);

  return (
    <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>
  );
};
