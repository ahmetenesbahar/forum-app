import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setShowCreateModal } from "state/modalSlice";

const CreateTab = () => {
  const modalRef = useRef(null);
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
      <div ref={modalRef} className={`w-12 h-12 bg-red-600 `}></div>
    </div>
  );
};

export default CreateTab;
