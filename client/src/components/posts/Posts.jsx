import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "state/postSlice";

const Posts = () => {
  const dispatch = useDispatch();
  const { posts, status, error } = useSelector((state) => state.posts);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    dispatch(fetchPosts(token));
  }, [dispatch, token]);

  return (
    <div>
      {posts.map((post) => (
        <div key={post._id}>
          {console.log(post._id, post.title, post.picturePath)}
          <p className="text-white">{post.title}</p>
          <img
            src={`http://localhost:3001/assets/${post?.picturePath}`}
            alt=""
            className="w-10 h-10"
          />
        </div>
      ))}
    </div>
  );
};

export default Posts;
