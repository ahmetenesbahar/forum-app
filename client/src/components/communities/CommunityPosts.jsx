import React from "react";
import Post from "components/posts/Post";

const CommunityPosts = ({ community }) => {
  return (
    <div className="flex flex-col items-center max-w-[756px] w-full gap-y-2">
      {community?.posts
        ?.slice()
        .reverse()
        .map((post) => (
          <Post post={post} />
        ))}
    </div>
  );
};

export default CommunityPosts;
