import React, { useEffect, useState } from "react";
import CreateTab from "./modals/CreateTab";
import { useSelector } from "react-redux";
import ModalCenter from "./modals/ModalCenter";
import Flow from "./Flow";
import PostDetail from "./posts/PostDetail";
import { useTheme } from "./contexts/ThemeContext";

const Main = () => {
  const user = useSelector((state) => state.auth.user);
  const createTab = useSelector((state) => state.modal.showCreateModal);
  const postId = useSelector((state) => state.posts.postId);
  const { theme } = useTheme();
  const [selectedPostId, setSelectedPostId] = useState(null);

  useEffect(() => {
    setSelectedPostId(postId);
  }, [postId]);

  return (
    <div
      className={`w-full py-4 h-[calc(100vh-80px)] overflow-auto scrollbar ${theme.scrollbarThumb} ${theme.scrollbarTrack}  scrollbar-thin`}
    >
      {createTab & !(user === null) ? <ModalCenter type={"createTab"} /> : " "}
      {selectedPostId ? <PostDetail postId={postId} /> : <Flow />}
    </div>
  );
};

Main.displayName = "Main";
export default Main;
