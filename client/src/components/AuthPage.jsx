import React from "react";
import Form from "./shared/Form";
import { useSelector } from "react-redux";

const AuthPage = ({ theme }) => {
  const user = useSelector((state) => state.user);
  return (
    <>
      {user === null && (
        <div
          className={`relative ${theme.background} px-10 py-5   min-w-[450px] max-w-[500px]
      rounded-xl flex items-center justify-center shadow-md`}
        >
          <Form theme={theme} />
        </div>
      )}
    </>
  );
};

export default AuthPage;
