import React from "react";
import { useSelector } from "react-redux";
import useUserDownVotes from "hooks/useUserDownVotes";
import Post from "components/posts/Post";

const UserDownVotes = ({ userId }) => {
  const token = useSelector((state) => state.auth.token);
  const { data: posts } = useUserDownVotes(token, userId);

  return (
    <div className="flex flex-col items-center  w-full gap-y-2 ">
      {posts
        ?.slice()
        .reverse()
        .map((post) => (
          <Post post={post} />
        ))}
    </div>
  );
};

export default UserDownVotes;
