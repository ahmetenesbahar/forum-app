import React from "react";
import { useTheme } from "components/contexts/ThemeContext";

const Comments = ({ post }) => {
  return (
    <div>
      {post.comments.map((comment) => (
        <div>asd</div>
      ))}
    </div>
  );
};

export default Comments;
