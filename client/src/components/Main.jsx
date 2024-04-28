import React, { useEffect } from "react";
import CreateTab from "./modals/CreateTab";
import { useSelector } from "react-redux";
import ModalCenter from "./modals/ModalCenter";
import Flow from "./Flow";

const Main = () => {
  const user = useSelector((state) => state.auth.user);
  const createTab = useSelector((state) => state.modal.showCreateModal);

  return (
    <div className="w-full p-8">
      {createTab & !(user === null) ? <ModalCenter type={"createTab"} /> : " "}
      <Flow />
    </div>
  );
};

export default Main;
