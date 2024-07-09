import React, { useEffect, useState } from "react";
import usePost from "hooks/usePost";
import { useSelector, useDispatch } from "react-redux";
import { setPostId } from "../../state/postSlice";
import { useTheme } from "components/contexts/ThemeContext";
import useHandlePosts from "hooks/useHandlePosts";
import PostActions from "./PostActions";
import { RiArrowLeftFill } from "react-icons/ri";
import Comments from "./Comments";
import PostVotes from "./PostVotes";

const PostDetail = ({ postId }) => {
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const { data: post } = usePost(token, postId);
  const { handleComment } = useHandlePosts(token, post, user?._id);
  const [commentValue, setCommentValue] = useState(null);
  const dispatch = useDispatch();
  const { theme } = useTheme();

  const handleGoBack = () => {
    dispatch(setPostId(null));
  };

  const timeSince = (date) => {
    const now = new Date();
    const createdAt = new Date(date);
    const diffTime = Math.abs(now - createdAt);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} day ago`;
  };

  return (
    <div className="relative flex py-2 justify-center w-full gap-2">
      <div
        className={`flex items-center justify-center w-8 h-8 rounded-full ${theme.secondaryBackground}   cursor-pointer`}
        onClick={() => {
          handleGoBack();
        }}
      >
        <RiArrowLeftFill
          className={`w-8 h-8 ${theme.hoverUpVote} rounded-full`}
        />
      </div>
      <div className="flex flex-col items-center max-w-[756px] w-full gap-y-2">
        <div
          key={post?._id}
          className={`w-full px-3 py-1 ${theme.hoverBackground} rounded-lg`}
        >
          <div className="flex items-center justify-between">
            <div className={`flex items-center gap-1`}>
              <img
                src={`http://localhost:3001/assets/${post?.community?.picturePath}`}
                alt=""
                className="w-7 h-7 rounded-full"
              />
              <p className="text-sm font-medium opacity-90">
                f/{post?.community?.communityName}
                <span className="opacity-70 font-normal text-center pl-1">
                  • {timeSince(post?.createdAt)}
                </span>
              </p>
            </div>
            <PostActions post={post} />
          </div>
          <p className="font-medium text-xl mt-1">{post?.title}</p>
          <p className="mt-2">{post?.content}</p>
          {post?.picturePath === "undefined" ? null : (
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
                className="z-10 max-w-[724px] max-h-[430px] h-full object-contain select-none"
              />
            </div>
          )}
          <div className="flex items-center gap-3 mt-3">
            <PostVotes post={post} />
          </div>
        </div>
        <div className="flex flex-col w-full">
          <div className={`relative border-2 ${theme.borderGray} rounded-xl `}>
            <textarea
              className={`w-full h-28 bg-transparent  rounded-lg focus:outline-none p-4`}
              placeholder="Add Comment"
              onChange={(e) => {
                setCommentValue(e.target.value);
              }}
              value={commentValue}
            />
            <div className="flex justify-end items-end w-full px-1 py-1">
              <button
                className={` ${theme.primary} ${theme.hoverPrimary} rounded-xl px-2 py-1 text-white `}
                onClick={() => {
                  handleComment(postId, user._id, commentValue);
                  setCommentValue("");
                }}
              >
                Comment
              </button>
            </div>
          </div>
          <Comments post={post} />
        </div>
      </div>
    </div>
  );
};
PostDetail.displayName = "PostDetail";
export default PostDetail;
