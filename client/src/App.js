import React from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "components/HomePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { getTheme } from "theme";

const App = () => {
  const mode = useSelector((state) => state.mode);
  const theme = getTheme(mode);

  return (
    <div className={`app ${theme.background} ${theme.text}`}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage theme={theme} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
