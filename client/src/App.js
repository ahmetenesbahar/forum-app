import React from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "components/HomePage";
import { useTheme } from "components/contexts/ThemeContext";

const App = () => {
  const { theme } = useTheme();

  return (
    <div className={`app ${theme.background} ${theme.text}`}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
