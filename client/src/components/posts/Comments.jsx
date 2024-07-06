import React from "react";
import { useTheme } from "components/contexts/ThemeContext";

const Comments = ({ post }) => {
  const { theme } = useTheme();

  const timeSince = (date) => {
    const now = new Date();
    const createdAt = new Date(date);
    const diffTime = Math.abs(now - createdAt);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} day ago`;
  };
  return (
    <div className="mt-8">
      {post?.comments?.map((comment, index) => (
        <div className="mt-1 rounded-lg">
          <div className={`flex items-center gap-1`}>
            <img
              src={`http://localhost:3001/assets/${comment?.author.picturePath}`}
              alt=""
              className="w-7 h-7 rounded-full"
            />
            <p className=" text-sm font-medium opacity-90">
              {comment?.author.profileName}
              <span className="opacity-70 font-normal text-center pl-1">
                • {timeSince(comment?.createdAt)}
              </span>
            </p>
          </div>
          <p className="pl-[32px] mb-1">{comment?.text}</p>
          <div className={`w-full h-px ${theme.grayBackground}`} />
        </div>
      ))}
    </div>
  );
};

export default Comments;
