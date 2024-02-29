import React from "react";
import Navbar from "components/Navbar";
import AuthPage from "./AuthPage";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div className="z-50 absolute w-full h-full top-0 ">
        <AuthPage />
      </div>
    </div>
  );
};

export default HomePage;
