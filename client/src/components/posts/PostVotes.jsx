import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import useHandlePosts from "hooks/useHandlePosts";
import { PiArrowFatDown, PiArrowFatUp } from "react-icons/pi";
import { useTheme } from "components/contexts/ThemeContext";

const PostVotes = ({ post }) => {
  const { theme } = useTheme();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const { handleUpVote, handleDownVote, upVoted, downVoted } =
    useHandlePosts(token);
  const [isVoted, setIsVoted] = useState(false);

  useEffect(() => {
    if (upVoted || downVoted) {
      setIsVoted(true);
    } else {
      setIsVoted(false);
    }
  }, [upVoted, downVoted]);

  return (
    <div
      className={
        upVoted
          ? ` relative w-20 h-9 flex items-center rounded-full space-between  ${theme.upVoteBackground}`
          : downVoted
          ? ` relative w-20 h-9 flex items-center rounded-full space-between  ${theme.downVoteBackground}`
          : ` relative w-20 h-9 flex items-center rounded-full space-between  ${theme.secondaryBackground}`
      }
    >
      <div
        className={`w-9 h-9 flex items-center`}
        onClick={() => {
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
      <p className="select-none">
        {post?.votes.reduce((total, vote) => {
          if (vote.type === "upvote") {
            return total + 1;
          } else if (vote.type === "downvote") {
            return total - 1;
          }
          return total;
        }, 0)}
      </p>
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
