import React from "react";
import Navbar from "components/Navbar";
import AuthPage from "./AuthPage";
import { useSelector } from "react-redux";

const HomePage = ({ theme }) => {
  const user = useSelector((state) => state.user);

  return (
    <div>
      <Navbar theme={theme} />
      {user === null && (
        <div className="z-50 absolute w-full h-full top-0  bg-gray-500 bg-opacity-20 flex items-center justify-center">
          <AuthPage theme={theme} />
        </div>
      )}
    </div>
  );
};

export default HomePage;
