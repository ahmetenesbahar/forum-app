import React from "react";
import LoginModal from "./modals/LoginModal";
import RegisterModal from "./modals/RegisterModal";
import { useSelector } from "react-redux";

const AuthPage = ({ theme }) => {
  const isRegistered = useSelector((state) => state.isRegistered);
  return (
    <div>
      {isRegistered ? (
        <LoginModal theme={theme} />
      ) : (
        <RegisterModal theme={theme} />
      )}
    </div>
  );
};

export default AuthPage;
