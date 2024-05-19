import React, { useRef, useEffect } from "react";
import Form from "./Form";
import { RiCloseLine } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { setShowForm } from "../state/index";
import { useTheme } from "./contexts/ThemeContext";

const AuthPage = () => {
  const dispatch = useDispatch();
  const modalRef = useRef(null);
  const { theme } = useTheme();
  const user = useSelector((state) => state.auth.user);
  const showForm = useSelector((state) => state.auth.showForm);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showForm &&
        modalRef.current &&
        !modalRef.current.contains(event.target)
      ) {
        setTimeout(() => {
          dispatch(setShowForm(false));
        }, 10);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showForm, dispatch]);

  return (
    <>
      {(user === null) & showForm ? (
        <div className="z-50 absolute w-full h-full top-0 bg-gray-500 bg-opacity-20 flex items-center justify-center">
          <div
            className={`relative ${theme.background} px-10 py-5 min-w-[450px] max-w-[500px] rounded-xl flex items-center justify-center shadow-md`}
            ref={modalRef}
          >
            <RiCloseLine
              className="absolute rounded-full w-8 h-8 right-2 top-2 text-white cursor-pointer"
              onClick={() => dispatch(setShowForm(false))}
            />
            <Form theme={theme} />
          </div>
        </div>
      ) : null}
    </>
  );
};

AuthPage.displayName = "AuthPage";
export default AuthPage;
