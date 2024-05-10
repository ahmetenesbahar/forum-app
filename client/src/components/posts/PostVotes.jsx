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
  const { handleUpVote, handleDownVote } = useHandlePosts(token, post?._id);

  const [isVoted, setIsVoted] = useState(false);
  const [upVoted, setUpVoted] = useState(false);
  const [downVoted, setDownVoted] = useState(false);

  useEffect(() => {
    if (upVoted || downVoted) {
      setIsVoted(true);
    } else {
      setIsVoted(false);
    }
  }, [upVoted, downVoted]);

  useEffect(() => {
    post.votes.map((vote) => {
      vote.userId === user._id && vote.type === "upvote"
        ? setUpVoted(true)
        : setDownVoted(true);
    });
  });

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
        onClick={(e) => {
          handleUpVote(post._id, user._id);
          e.stopPropagation();
          setUpVoted(!upVoted);
          setDownVoted(false);
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
          setUpVoted(false);
          setDownVoted(!downVoted);
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
