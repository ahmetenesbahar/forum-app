import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "state/postSlice";
import { useTheme } from "components/contexts/ThemeContext";

const Posts = () => {
  const dispatch = useDispatch();
  const { posts, status, error } = useSelector((state) => state.posts);
  const token = useSelector((state) => state.auth.token);
  const { theme } = useTheme();

  useEffect(() => {
    dispatch(fetchPosts(token));
  }, [dispatch, token]);

  return (
    <div className="flex flex-col justify-center items-center max-w-[756px] w-full gap-y-2 ">
      {posts.map((post) => (
        <>
          <div
            key={post._id}
            className={`w-full  px-2 py-1  ${theme.hoverBackground} cursor-pointer rounded-lg `}
          >
            <div className={`flex items-center gap-1 `}>
              <img
                src={`http://localhost:3001/assets/${post.community?.picturePath}`}
                alt=""
                className="w-7 h-7 rounded-full"
              />
              <p className="text-sm font-medium opacity-90">
                f/{post.community.communityName}{" "}
                <span className="opacity-70 font-normal">• 1 day ago</span>
              </p>
            </div>
            <p className="text-white font-medium text-xl">{post.title}</p>
            <p className="">{post.content}</p>
            {post.picturePath === "" ? null : (
              <div className="w-full flex items-center justify-center ">
                <img
                  src={`http://localhost:3001/assets/${post?.picturePath}`}
                  alt=""
                  className="max-w-[724px] max-h-[540px] rounded-lg"
                />
              </div>
            )}
          </div>
          <div className={`w-full h-px ${theme.grayBackground}`} />
        </>
      ))}
    </div>
  );
};

export default Posts;
