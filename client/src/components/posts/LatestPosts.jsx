import React from "react";
import { useTheme } from "components/contexts/ThemeContext";
import { useSelector } from "react-redux";
import useLatestPosts from "hooks/useLatestPosts";

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
      ))}
    </>
  );
};

export default LatestPosts;
