import React from "react";

const PostVoteCount = ({ post }) => {
  return (
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
  );
};

export default PostVoteCount;
