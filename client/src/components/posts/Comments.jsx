import React from "react";
import { useTheme } from "components/contexts/ThemeContext";
import { useDispatch } from "react-redux";
import { setUserId } from "state/userSlice";

const Comments = ({ post }) => {
  const { theme } = useTheme();
  const dispatch = useDispatch();

  const timeSince = (date) => {
    const now = new Date();
    const createdAt = new Date(date);
    const diffTime = Math.abs(now - createdAt);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} day ago`;
  };

  const handleGoProfile = (userId) => {
    dispatch(setUserId(userId));
  };

  return (
    <div className="mt-8">
      {post?.comments?.map((comment, index) => (
        <div className="mt-1 rounded-lg">
          <div className={`flex items-center gap-1`}>
            <img
              src={`http://localhost:3001/assets/${comment?.author.picturePath}`}
              alt=""
              className="w-7 h-7 rounded-full"
            />
            <p
              className=" text-sm font-medium opacity-90 cursor-pointer hover:underline "
              onClick={() => {
                handleGoProfile(comment?.author._id);
              }}
            >
              {comment?.author.profileName}
            </p>
            <p className=" text-sm opacity-70 font-normal text-center pl-1">
              • {timeSince(comment?.createdAt)}
            </p>
          </div>
          <p className="pl-[32px] mb-1">{comment?.text}</p>
          <div className={`w-full h-px ${theme.grayBackground}`} />
        </div>
      ))}
    </div>
  );
};

export default Comments;
