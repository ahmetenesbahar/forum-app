import React from "react";
import Form from "../shared/Form";

const RegisterPage = ({ theme }) => {
  return (
    <div
      className={`relative ${theme.background} px-10 py-10   min-w-[450px] min-h-[500px]
      rounded-xl`}
    >
      <Form theme={theme} />
    </div>
  );
};

export default RegisterPage;
