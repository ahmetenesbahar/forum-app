import React from "react";
import Navbar from "components/Navbar";
import AuthPage from "./AuthPage";
import Page from "./Page";
import { useSelector } from "react-redux";

const HomePage = ({ theme }) => {
  const user = useSelector((state) => state.user);

  return (
    <div>
      <Navbar theme={theme} />
      <AuthPage theme={theme} />
      <Page />
    </div>
  );
};

export default HomePage;
