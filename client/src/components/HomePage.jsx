import React from "react";
import Navbar from "components/Navbar";
import AuthPage from "./AuthPage";
import Layout from "./Layout";
import { useSelector } from "react-redux";

const HomePage = () => {
  const user = useSelector((state) => state.user);

  return (
    <div>
      <Navbar />
      <AuthPage />
      <Layout />
    </div>
  );
};

export default HomePage;
