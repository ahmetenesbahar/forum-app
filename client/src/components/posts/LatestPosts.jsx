import React from "react";
import { useTheme } from "components/contexts/ThemeContext";
import { useSelector } from "react-redux";
import useLatestPosts from "hooks/useLatestPosts";
import PostVoteCount from "./PostVoteCount";

const LatestPosts = () => {
  const { theme } = useTheme();
  const token = useSelector((state) => state.auth.token);
  const { data: latestPosts } = useLatestPosts(token);

  return (
    <>
      {latestPosts?.map((post, index) => (
        <div key={post._id}>
          <div className="flex gap-1 cursor-pointer hover:underline mt-2">
            <img
              src={`http://localhost:3001/assets/${post.community?.picturePath}`}
              alt="community"
              className="w-6 h-6 rounded-full"
            />
            <p className={`text-xs  ${theme.boxText}`}>
              f/{post?.community?.communityName}
            </p>
          </div>
          <div className=" mt-1">
            <div className="flex justify-between items-center   ">
              <p
                className={`text-[14px] opacity-90 hover:underline cursor-pointer ${theme.boxText} first-letter:uppercase font-medium`}
              >
                {post.title}
              </p>
              {post.picturePath === "undefined" ? null : (
                <div className="flex items-center justify-center">
                  <img
                    src={`http://localhost:3001/assets/${post?.picturePath}`}
                    alt=""
                    className="z-10 max-w-20 max-h-20  h-full  object-contain select-none "
                  />
                </div>
              )}
            </div>
            <div>
              <p className={`text-xs mt-2 flex gap-1 ${theme.boxText}`}>
                <PostVoteCount post={post} /> votes <span>·</span>
                {post.comments.length} comments
              </p>
            </div>
          </div>
          {index !== latestPosts.length - 1 && (
            <div className={`mt-2 border ${theme.borderGray}`} />
          )}
        </div>
      ))}
    </>
  );
};

LatestPosts.displayName = "LatestPosts";
export default LatestPosts;
