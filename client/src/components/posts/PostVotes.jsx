import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import useHandlePosts from "hooks/useHandlePosts";
import { PiArrowFatDown, PiArrowFatUp } from "react-icons/pi";
import { useTheme } from "components/contexts/ThemeContext";
import PostVoteCount from "components/posts/PostVoteCount";

const PostVotes = ({ post }) => {
  const { theme } = useTheme();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const { handleUpVote, handleDownVote, hasVoted } = useHandlePosts(
    token,
    post,
    user?._id
  );

  const [isVoted, setIsVoted] = useState(false);

  useEffect(() => {
    if (hasVoted === "upvote" || hasVoted === "downvote") {
      setIsVoted(true);
    } else {
      setIsVoted(false);
    }
  }, [hasVoted]);

  return (
    <div
      className={
        hasVoted === "upvote"
          ? ` relative w-24 h-9 flex items-center rounded-full justify-between ${theme.upVoteBackground} text-white`
          : hasVoted === "downvote"
          ? ` relative w-24 h-9 flex items-center rounded-full justify-between  ${theme.downVoteBackground} text-white`
          : ` relative w-24 h-9 flex items-center rounded-full justify-between ${theme.secondaryBackground}`
      }
    >
      <div
        className={`w-9 h-9 flex items-center`}
        onClick={(e) => {
          handleUpVote(post._id, user._id);
        }}
      >
        <PiArrowFatUp
          className={
            isVoted
              ? ` w-full h-full rounded-full px-2 py-1  cursor-pointer ${theme.hoverUpVote} $ `
              : ` w-full h-full rounded-full px-2 py-1  cursor-pointer ${theme.upVote} ${theme.secondaryHoverBackground} ${theme.activeBackground}  `
          }
        />
      </div>
      <PostVoteCount post={post} />
      <div
        className={` w-9 h-9 flex items-center`}
        onClick={() => {
          handleDownVote(post._id, user._id);
        }}
      >
        <PiArrowFatDown
          className={
            isVoted
              ? `w-full h-full rounded-full px-2 py-1  cursor-pointer ${theme.hoverDownVote}`
              : `w-full h-full rounded-full px-2 py-1  cursor-pointer ${theme.downVote} ${theme.secondaryHoverBackground} ${theme.activeBackground}`
          }
        />
      </div>
    </div>
  );
};

export default PostVotes;
