import React from "react";
import Navbar from "components/Navbar";
import AuthPage from "./AuthPage";
import Layout from "./Layout";
import { useSelector } from "react-redux";

const HomePage = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="">
      <Navbar />
      <AuthPage />
      <Layout />
    </div>
  );
};

export default HomePage;
