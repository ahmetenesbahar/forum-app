import React, { useState } from "react";
import usePost from "hooks/usePost";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useTheme } from "components/contexts/ThemeContext";
import { useNavigate } from "react-router-dom";
import useHandlePosts from "hooks/useHandlePosts";
import PostActions from "./PostActions";
import Comments from "./Comments";
import PostVotes from "./PostVotes";

const PostDetail = () => {
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const { postId } = useParams();
  const { data: post } = usePost(token, postId);
  const { handleComment } = useHandlePosts(token, post, user?._id);
  const [commentValue, setCommentValue] = useState(null);
  const { theme } = useTheme();
  const navigate = useNavigate();

  const timeSince = (date) => {
    const now = new Date();
    const createdAt = new Date(date);
    const diffTime = Math.abs(now - createdAt);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} day ago`;
  };

  return (
    <div
      className={`relative flex py-2 justify-center w-full gap-2 h-[calc(100vh-80px)] overflow-auto scrollbar ${theme.scrollbarThumb} ${theme.scrollbarTrack} scrollbar-thin`}
    >
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
              <p
                className="text-sm font-medium opacity-90 hover:underline cursor-pointer"
                onClick={(e) => {
                  navigate(`/communities/${post?.community._id}`);
                  e.stopPropagation();
                }}
              >
                f/{post?.community?.communityName}
              </p>
              <p className=" text-sm opacity-70 font-normal text-center pl-1">
                • {timeSince(post?.createdAt)}
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
