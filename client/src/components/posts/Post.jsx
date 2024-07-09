import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPostId } from "../../state/postSlice";
import { useTheme } from "components/contexts/ThemeContext";
import PostActions from "./PostActions";
import { GoComment } from "react-icons/go";
import PostVotes from "./PostVotes";

const Post = ({ post }) => {
  const dispatch = useDispatch();
  const { theme } = useTheme();

  const handlePostClick = (postId) => {
    dispatch(setPostId(postId));
  };

  const timeSince = (date) => {
    const now = new Date();
    const createdAt = new Date(date);
    const diffTime = Math.abs(now - createdAt);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} day ago`;
  };
  return (
    <>
      <div
        key={post._id}
        className={`w-full  px-3 py-1  ${theme.hoverBackground} cursor-pointer rounded-lg `}
        onClick={() => {
          handlePostClick(post._id);
        }}
      >
        <div className="flex items-center justify-between">
          <div className={`flex items-center gap-1 `}>
            <img
              src={`http://localhost:3001/assets/${post.community?.picturePath}`}
              alt=""
              className="w-7 h-7 rounded-full"
            />
            <p className="text-sm font-medium opacity-90">
              f/{post?.community?.communityName}
              <span className="opacity-70 font-normal text-center pl-1">
                • {timeSince(post.createdAt)}
              </span>
            </p>
          </div>
          <PostActions post={post} />
        </div>
        <p className=" font-medium text-xl mt-1">{post.title}</p>
        <p className="mt-2">{post.content}</p>
        {post.picturePath === "undefined" ? null : (
          <div
            className={`w-full relative flex items-center justify-center bg-contain rounded-xl mt-3 border ${theme.borderGray}`}
          >
            <div
              className={`absolute max-w-[722px] max-h-[430px] w-full h-full rounded-xl`}
              style={{
                backgroundImage: `url('http://localhost:3001/assets/${post?.picturePath}')`,
                backgroundSize: "350% 360%",
                backgroundPosition: "center",
                imageRendering: "smooth",
                filter: "blur(3px)",
              }}
            />
            <img
              src={`http://localhost:3001/assets/${post?.picturePath}`}
              alt=""
              className="z-10 max-w-[724px] max-h-[430px] h-full  object-contain select-none"
            />
          </div>
        )}
        <div className="flex items-center gap-3 mt-3">
          <PostVotes post={post} />

          <div
            className={`w-24 h-9 rounded-full   ${theme.secondaryBackground} `}
          >
            <div
              className={`w-full h-full flex items-center rounded-full justify-center gap-3 px-2 py-1 ${theme.secondaryHoverBackground} ${theme.activeBackground}`}
            >
              <GoComment className="w-5 h-5" />
              <p className="select-none*">{post?.comments?.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className={`w-full h-px ${theme.grayBackground}`} />
    </>
  );
};

export default Post;
