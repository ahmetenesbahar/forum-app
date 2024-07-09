import React, { useEffect } from "react";
import useUserPosts from "hooks/useUserPosts";
import { useSelector } from "react-redux";
import Post from "components/posts/Post";

const UserPosts = ({ userId }) => {
  const token = useSelector((state) => state.auth.token);
  const { data: posts } = useUserPosts(token, userId);

  return (
    <div className="flex flex-col items-center max-w-[756px] w-full gap-y-2">
      {posts
        ?.slice()
        .reverse()
        .map((post) => (
          <Post post={post} />
        ))}
    </div>
  );
};

export default UserPosts;
