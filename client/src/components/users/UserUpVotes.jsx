import React from "react";
import { useSelector } from "react-redux";
import useUserUpVotes from "hooks/useUserUpVotes";
import Post from "components/posts/Post";

const UserUpVotes = ({ userId }) => {
  const token = useSelector((state) => state.auth.token);
  const { data: posts } = useUserUpVotes(token, userId);

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

export default UserUpVotes;
