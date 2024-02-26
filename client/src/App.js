import React from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "views/homePage";
import LoginPage from "views/loginPage";
import ProfilePage from "views/profilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import Navbar from "views/navbar";

const App = () => {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => {
    if (mode === "light") {
      return {
        primary: "bg-light-primary",
        secondary: "bg-light-secondary",
        background: "bg-light-background",
        text: "text-light-text",
      };
    } else {
      return {
        primary: "bg-dark-primary",
        secondary: "bg-dark-secondary",
        background: "bg-dark-background",
        text: "text-dark-text",
      };
    }
  }, [mode]);

  return (
    <div className={`app ${theme.background} ${theme.text}`}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
