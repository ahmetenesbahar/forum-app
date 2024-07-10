import React, { useState } from "react";
import { useTheme } from "components/contexts/ThemeContext";
import { RiArrowUpSLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const PostDisplay = ({ results }) => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [isShowing, setIsShowing] = useState(true);

  return (
    <div>
      <div
        className={`flex items-center justify-between px-2 cursor-pointer ${theme.secondaryHoverBackground}`}
        onClick={() => setIsShowing(!isShowing)}
      >
        <p className="text-lg font-medium px-4 py-1">Posts</p>
        {results?.posts.length > 0 && (
          <RiArrowUpSLine
            className={
              isShowing
                ? "w-6 h-6 rotate-0 ease-linear duration-75 "
                : "w-6 h-6 rotate-180 ease-linear duration-75"
            }
          />
        )}
      </div>
      <div className={`w-full h-px ${theme.grayBackground}`} />
      {isShowing &&
        results?.posts?.map((post) => (
          <div
            className={`flex items-center gap-3 cursor-pointer py-1 px-4 w-full justify-between ${theme.secondaryHoverBackground}`}
            onClick={() => {
              navigate(`/posts/${post._id}`);
            }}
          >
            <div className="flex flex-col justify-between">
              <p className=" font-semibold text-base">{post?.title}</p>
              <p className="text-sm">{post?.content}</p>
              <div className="flex gap-1">
                <img
                  src={`http://localhost:3001/assets/${post?.community.picturePath}`}
                  alt="Community avatar"
                  className="w-6 h-6 rounded-full"
                />
                <p className={theme.boxText}>
                  f/{post?.community.communityName}
                </p>
              </div>
            </div>
            <div className="">
              {post?.picturePath !== "undefined" && (
                <img
                  src={`http://localhost:3001/assets/${post?.picturePath}`}
                  alt="Post"
                  className="object-contain max-w-[132px] max-h-[132px]"
                />
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default PostDisplay;
