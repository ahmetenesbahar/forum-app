import React from "react";
import LoginModal from "./modals/LoginModal";
import RegisterModal from "./modals/RegisterModal";
import { useDispatch, useSelector } from "react-redux";

const AuthPage = () => {
  const user = useSelector((state) => state.user);
  const isRegistered = useSelector((state) => state.isRegistered);
  return <div>{isRegistered ? <LoginModal /> : <RegisterModal />}</div>;
};

export default AuthPage;
