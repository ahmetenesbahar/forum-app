import React from "react";
import Form from "../shared/Form";

const RegisterPage = ({ theme }) => {
  return (
    <div
      className={`relative ${theme.background} px-10 py-5   min-w-[450px] min-h-[500px]
      rounded-xl flex items-center justify-center shadow-md`}
    >
      <Form theme={theme} />
    </div>
  );
};

export default RegisterPage;
