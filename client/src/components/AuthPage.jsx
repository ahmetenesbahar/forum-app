import React from "react";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import { useDispatch, useSelector } from "react-redux";

const AuthPage = () => {
  const user = useSelector((state) => state.user);
  const isRegistered = useSelector((state) => state.isRegistered);
  return <div>{isRegistered ? <LoginPage /> : <RegisterPage />}</div>;
};

export default AuthPage;
