import React from "react";
import Form from "./Form";
import { RiCloseLine } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { setShowForm } from "../state/index";

const AuthPage = ({ theme }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const showForm = useSelector((state) => state.showForm);

  return (
    <>
      {(user === null) & showForm ? (
        <div className="z-50 absolute w-full h-full top-0  bg-gray-500 bg-opacity-20 flex items-center justify-center">
          <div
            className={`relative ${theme.background} px-10 py-5   min-w-[450px] max-w-[500px]
      rounded-xl flex items-center justify-center shadow-md relative `}
          >
            <RiCloseLine
              className={`absolute rounded-full  w-8 h-8 right-2 top-2 ${theme.primary} text-white cursor-pointer`}
              onClick={(e) => dispatch(setShowForm(false))}
            />
            <Form theme={theme} />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default AuthPage;
