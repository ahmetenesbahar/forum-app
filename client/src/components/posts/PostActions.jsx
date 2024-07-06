import React, { useMemo, useState, useRef, useEffect } from "react";
import { RiMoreFill, RiEyeOffFill, RiDeleteBin6Line } from "react-icons/ri";
import { useTheme } from "components/contexts/ThemeContext";
import { useSelector } from "react-redux";
import useHandlePosts from "hooks/useHandlePosts";

const PostActions = ({ post }) => {
  const { theme } = useTheme();
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const [showActions, setShowActions] = useState(false);
  const menu = useRef(null);
  const [isHidden, setIsHidden] = useState(false);
  const { handleDelete } = useHandlePosts(token);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showActions && menu.current && !menu.current.contains(event.target)) {
        setTimeout(() => {
          setShowActions(false);
        }, 10);
      }
    };

    document.addEventListener("mouseup", handleClickOutside);

    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, [showActions]);

  return (
    <div className="relative" ref={menu}>
      <div
        className={`cursor-pointer rounded-full ${theme.secondaryHoverBackground} p-2`}
        onClick={(e) => {
          setShowActions(!showActions);
          e.stopPropagation();
        }}
      >
        <RiMoreFill />
      </div>
      <div
        className={
          showActions
            ? `max-h-[25.5rem] ${theme.background} absolute top-10 right-0 mr-2 select-none flex flex-col rounded-xl z-50`
            : `hidden`
        }
        style={{
          boxShadow:
            "0 1px 4px rgba(0, 0, 0, 0.33),0 4px 4px rgba(0, 0, 0, 0.33)",
        }}
      >
        <div className="z-50">
          <button
            className={`flex items-center gap-3 w-full h-full  rounded-t-xl px-4 py-2  ${theme.hoverBackground}`}
          >
            <RiEyeOffFill className="w-5 h-5" />
            <p>Hide</p>
          </button>
          {post?.author?._id === user?._id && (
            <button
              className={`flex items-center gap-3 rounded-b-xl   px-4 py-2  ${theme.hoverBackground}`}
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(post._id);
              }}
            >
              <RiDeleteBin6Line className="text-red-500 w-5 h-5" />
              <p>Delete</p>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

PostActions.displayName = "PostActions";
export default PostActions;
