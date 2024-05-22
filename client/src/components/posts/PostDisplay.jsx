import React from "react";
import { useTheme } from "components/contexts/ThemeContext";

const PostDisplay = ({ results }) => {
  const { theme } = useTheme();
  return (
    <div>
      {results?.posts?.map((post) => (
        <div
          className={`flex items-center gap-3 cursor-pointer py-1 px-4 w-full justify-between ${theme.hoverBackground}`}
        >
          <div className="flex flex-col justify-between">
            <p className=" font-semibold text-base">{post?.title}</p>
            <p className="text-sm mb-2">{post?.content}</p>
            <div className="flex gap-1">
              <img
                src={`http://localhost:3001/assets/${post?.community.picturePath}`}
                alt="Community avatar"
                className="w-6 h-6 rounded-full"
              />
              <p>f/{post?.community.communityName}</p>
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
