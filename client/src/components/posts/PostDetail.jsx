import React from "react";
import { useParams } from "react-router-dom";
import usePost from "hooks/usePost";
import { useSelector } from "react-redux";
import { useTheme } from "components/contexts/ThemeContext";

const PostDetail = ({ postId }) => {
  const token = useSelector((state) => state.auth.token);
  const { post, loading } = usePost(token, postId);
  const { theme } = useTheme();
  return (
    <div>
      <div>asdas</div>
    </div>
  );
};

export default PostDetail;
