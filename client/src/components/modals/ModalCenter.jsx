import React, { useEffect, useState, useRef, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setShowCreateModal } from "state/modalSlice";
import { useTheme } from "components/contexts/ThemeContext";
import CreateTab from "./CreateTab";

const ModalCenter = ({ type }) => {
  const modalRef = useRef(null);
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const createTab = useSelector((state) => state.modal.showCreateModal);

  const [showModal, setShowModal] = useState(createTab);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showModal &&
        modalRef.current &&
        !modalRef.current.contains(event.target)
      ) {
        setTimeout(() => {
          setShowModal(false);
          dispatch(setShowCreateModal(false));
        }, 10);
      }
    };

    document.addEventListener("mouseup", handleClickOutside);

    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, [showModal]);
  return (
    <div
      className={` z-50 absolute w-full h-full top-0 left-0  bg-gray-500 bg-opacity-20 flex items-center justify-center ${
        showModal ? "block" : "hidden"
      }`}
    >
      <div
        ref={modalRef}
        className={`relative ${theme.background} px-10 py-5 min-w-[450px] max-w-[500px]
          rounded-xl flex items-center justify-center shadow-md relative flex-col`}
      >
        {type === "createTab" ? <CreateTab /> : ""}
      </div>
    </div>
  );
};

export default ModalCenter;
