import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ModalCenter from "./modals/ModalCenter";
import Flow from "./Flow";
import ProfilePage from "./users/ProfilePage";
import PostDetail from "./posts/PostDetail";
import { useTheme } from "./contexts/ThemeContext";

const Main = () => {
  const user = useSelector((state) => state.auth.user);
  const createTab = useSelector((state) => state.modal.showCreateModal);
  const postId = useSelector((state) => state.posts.postId);
  const userId = useSelector((state) => state.users.userId);
  const { theme } = useTheme();
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState(null);

  useEffect(() => {
    setSelectedPost(postId);
  }, [postId]);

  useEffect(() => {
    console.log(userId);
    setSelectedProfile(userId);
  }, [userId]);

  return (
    <div
      className={`w-full py-4 h-[calc(100vh-80px)] overflow-auto scrollbar ${theme.scrollbarThumb} ${theme.scrollbarTrack}  scrollbar-thin`}
    >
      {createTab & !(user === null) ? <ModalCenter type={"createTab"} /> : " "}
      {selectedPost ? (
        <PostDetail postId={postId} />
      ) : selectedProfile ? (
        <ProfilePage userId={userId} />
      ) : (
        <Flow />
      )}
    </div>
  );
};

Main.displayName = "Main";
export default Main;
