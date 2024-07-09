import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ModalCenter from "./modals/ModalCenter";
import { setPostId } from "../state/postSlice";
import { setUserId } from "../state/userSlice";
import Flow from "./Flow";
import ProfilePage from "./users/ProfilePage";
import PostDetail from "./posts/PostDetail";
import { useTheme } from "./contexts/ThemeContext";

const Main = () => {
  const user = useSelector((state) => state.auth.user);
  const createTab = useSelector((state) => state.modal.showCreateModal);
  const { theme } = useTheme();
  return (
    <div
      className={`w-full py-4 h-[calc(100vh-80px)] overflow-auto scrollbar ${theme.scrollbarThumb} ${theme.scrollbarTrack} scrollbar-thin`}
    >
      {createTab && user ? <ModalCenter type={"createTab"} /> : " "}
      <Flow />
    </div>
  );
};

Main.displayName = "Main";
export default Main;
