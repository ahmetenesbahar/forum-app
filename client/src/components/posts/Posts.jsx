import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "state/postSlice";
import { useTheme } from "components/contexts/ThemeContext";
import { PiArrowFatDown, PiArrowFatUp } from "react-icons/pi";
import { GoComment } from "react-icons/go";

const Posts = () => {
  const dispatch = useDispatch();
  const { posts, status, error } = useSelector((state) => state.posts);
  const token = useSelector((state) => state.auth.token);
  const { theme } = useTheme();

  useEffect(() => {
    dispatch(fetchPosts(token));
  }, [dispatch, token]);

  return (
    <div className="flex flex-col justify-center items-center max-w-[756px] w-full gap-y-2 ">
      {posts?.map((post) => (
        <>
          <div
            key={post._id}
            className={`w-full  px-4 py-1  ${theme.hoverBackground} cursor-pointer rounded-lg `}
          >
            <div className={`flex items-center gap-1 `}>
              <img
                src={`http://localhost:3001/assets/${post.community?.picturePath}`}
                alt=""
                className="w-7 h-7 rounded-full"
              />
              <p className="text-sm font-medium opacity-90">
                f/{post.community.communityName}{" "}
                <span className="opacity-70 font-normal">• 1 day ago</span>
              </p>
            </div>
            <p className=" font-medium text-xl">{post.title}</p>
            <p className="mt-2">{post.content}</p>
            {post.picturePath === "" ? null : (
              <div className="w-full relative flex items-center justify-center bg-contain rounded-xl mt-3">
                <div
                  className={`absolute max-w-[736px] max-h-[416px] w-full h-full ${theme.secondaryBackground} blur-md`}
                />
                <img
                  src={`http://localhost:3001/assets/${post?.picturePath}`}
                  alt=""
                  className="z-40 max-w-[724px] max-h-[540px] rounded-lg object-contain"
                />
              </div>
            )}
            <div className="flex items-center gap-3 mt-3">
              <div
                className={` relative w-20 h-9 flex items-center rounded-full space-between  ${theme.secondaryBackground}`}
              >
                <div
                  className={` w-9 h-9 flex items-center rounded-full px-2 py-1 ${theme.hoverBackground}`}
                >
                  <PiArrowFatUp
                    className={` w-5 h-5 cursor-pointer ${theme.upVote}  `}
                  />
                </div>

                {0}
                <div
                  className={` w-9 h-9 flex items-center rounded-full px-2 py-1 ${theme.hoverBackground}`}
                >
                  <PiArrowFatDown
                    className={`w-5 h-5 cursor-pointer ${theme.downVote}`}
                  />
                </div>
              </div>
              <div
                className={`w-20 h-9 flex items-center justify-center rounded-full gap-3 px-2 py-1  ${theme.secondaryBackground} ${theme.hoverBackground}`}
              >
                <GoComment className="w-5 h-5" />
                <p>31</p>
              </div>
            </div>
          </div>
          <div className={`w-full h-px ${theme.grayBackground}`} />
        </>
      ))}
    </div>
  );
};

export default Posts;
