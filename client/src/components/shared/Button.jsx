import React from "react";
import { useTheme } from "components/contexts/ThemeContext";

const Button = ({ label }) => {
  const { theme } = useTheme();
  return (
    <button
      type="submit"
      className={`${theme.primary} w-full px-4 py-2 rounded-full text-white focus:outline-none font-semibold`}
    >
      {label}
    </button>
  );
};

Button.displayName = "Button";
export default Button;
