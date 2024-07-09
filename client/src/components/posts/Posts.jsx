import React from "react";

import { useSelector } from "react-redux";

import usePosts from "hooks/usePosts";
import Post from "./Post";

const Posts = () => {
  const token = useSelector((state) => state.auth.token);

  const { data: posts } = usePosts(token);

  return (
    <div className="flex flex-col items-center max-w-[756px] w-full gap-y-2 ">
      {posts
        ?.slice()
        .reverse()
        ?.map((post, index) => (
          <Post post={post} />
        ))}
    </div>
  );
};

Posts.displayName = "Posts";
export default Posts;
