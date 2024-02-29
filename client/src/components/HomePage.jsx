import React from "react";
import Navbar from "components/Navbar";
import AuthPage from "./AuthPage";

const HomePage = ({ theme }) => {
  return (
    <div>
      <Navbar theme={theme} />
      <div className="z-50 absolute w-full h-full top-0  bg-gray-500 opacity-20">
        <AuthPage />
      </div>
    </div>
  );
};

export default HomePage;
