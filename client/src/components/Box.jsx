import React, { useState } from "react";
import { useTheme } from "./contexts/ThemeContext";
import { useSelector } from "react-redux";
import useLatestPosts from "hooks/useLatestPosts";

const Box = () => {
  const { theme } = useTheme();
  const [clearHandle, setClearHandle] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const { data: latestPosts } = useLatestPosts(token);

  return (
    <div
      className={
        clearHandle
          ? ` max-w-[305px] max-h-[820px] w-full`
          : `max-w-[305px] max-h-[820px] h-max w-full sticky top-[8px] rounded-2xl p-4 ${theme.boxBackground} hover:overflow-auto`
      }
    >
      <div
        className={
          clearHandle
            ? `hidden`
            : "flex justify-between items-center select-none"
        }
      >
        <p className="text-xs opacity-70 font-light uppercase">recent posts</p>
        <p
          className="text-blue-400 cursor-pointer text-sm"
          onClick={() => {
            setClearHandle(!clearHandle);
          }}
        >
          Clear
        </p>
      </div>
      <div className={clearHandle ? "hidden" : "flex flex-col mt-2 "}>
        {latestPosts?.map((post, index) => (
          <>
            <div key={post._id}>
              <div className="flex gap-1 cursor-pointer hover:underline mt-2">
                <img
                  src={`http://localhost:3001/assets/${post.community?.picturePath}`}
                  alt="community"
                  className="w-6 h-6 rounded-full"
                />
                <p className={`text-xs  ${theme.boxText}`}>
                  f/{post.community.communityName}
                </p>
              </div>
              <div className=" mt-1">
                <p
                  className={`text-[14px] opacity-90 hover:underline cursor-pointer ${theme.boxText} first-letter:uppercase font-medium`}
                >
                  {post.title}
                </p>
                <div>
                  <p className={`text-xs mt-2 ${theme.boxText}`}>
                    0 upvotes <span>·</span> 31 comments
                  </p>
                </div>
              </div>
              {index !== latestPosts.length - 1 && (
                <div className={`mt-2 border ${theme.borderGray}`}></div>
              )}
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default Box;
