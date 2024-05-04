import React, { useEffect } from "react";
import CreateTab from "./modals/CreateTab";
import { useSelector } from "react-redux";
import ModalCenter from "./modals/ModalCenter";
import Flow from "./Flow";
import { useTheme } from "./contexts/ThemeContext";

const Main = () => {
  const user = useSelector((state) => state.auth.user);
  const createTab = useSelector((state) => state.modal.showCreateModal);
  const { theme } = useTheme();

  return (
    <div
      className={`w-full py-4 h-[calc(100vh-80px)] overflow-auto scrollbar ${theme.scrollbarThumb} ${theme.scrollbarTrack}  scrollbar-thin`}
    >
      {createTab & !(user === null) ? <ModalCenter type={"createTab"} /> : " "}
      <Flow />
    </div>
  );
};

export default Main;
