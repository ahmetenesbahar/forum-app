import React from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "components/HomePage";
import LoginPage from "components/modals/LoginModal";
import ProfilePage from "components/ProfilePage";
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
          {/* <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} /> */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
