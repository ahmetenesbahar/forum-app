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
  const postId = useSelector((state) => state.posts.postId);
  const userId = useSelector((state) => state.users.userId);
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const [navigationStack, setNavigationStack] = useState([]);

  useEffect(() => {
    if (postId !== null && !navigationStack.includes("post")) {
      setNavigationStack([...navigationStack, "post"]);
    }
  }, [postId]);

  useEffect(() => {
    if (userId !== null && !navigationStack.includes("profile")) {
      setNavigationStack([...navigationStack, "profile"]);
    }
  }, [userId]);

  const handleGoBack = () => {
    const updatedStack = [...navigationStack];
    const lastPage = updatedStack.pop();
    setNavigationStack(updatedStack);

    if (lastPage === "profile") {
      dispatch(setUserId(null));
    } else if (lastPage === "post") {
      dispatch(setPostId(null));
    }
  };

  const renderContent = () => {
    const lastPage = navigationStack[navigationStack.length - 1];
    if (lastPage === "profile") {
      return <ProfilePage userId={userId} handleGoBack={handleGoBack} />;
    }
    if (lastPage === "post") {
      return <PostDetail postId={postId} handleGoBack={handleGoBack} />;
    }
    return <Flow />;
  };

  return (
    <div
      className={`w-full py-4 h-[calc(100vh-80px)] overflow-auto scrollbar ${theme.scrollbarThumb} ${theme.scrollbarTrack} scrollbar-thin`}
    >
      {createTab && user ? <ModalCenter type={"createTab"} /> : " "}
      {renderContent()}
    </div>
  );
};

Main.displayName = "Main";
export default Main;
