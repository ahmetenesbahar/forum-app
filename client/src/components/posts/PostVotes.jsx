import React from "react";

const PostVotes = ({ post }) => {
  return (
    <p className="select-none">
      {post.votes.reduce((total, vote) => {
        if (vote.type === "upvote") {
          return total + 1;
        } else if (vote.type === "downvote") {
          return total - 1;
        }
        return total;
      }, 0)}
      {console.log(post.votes.map((vote) => vote.userId))}
    </p>
  );
};

export default PostVotes;
