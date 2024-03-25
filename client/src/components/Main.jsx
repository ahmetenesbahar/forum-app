import React, { useEffect } from "react";
import CreateTab from "./modals/CreateTab";
import { useSelector } from "react-redux";

const Main = () => {
  const user = useSelector((state) => state.auth.user);
  const createTab = useSelector((state) => state.modal.showCreateModal);

  return (
    <div className="w-5/6 p-8">
      {createTab & !(user === null) ? <CreateTab /> : " "}
    </div>
  );
};

export default Main;
