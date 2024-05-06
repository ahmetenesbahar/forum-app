import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "components/contexts/ThemeContext";
import { PiArrowFatDown, PiArrowFatUp } from "react-icons/pi";
import { GoComment } from "react-icons/go";
import usePosts from "hooks/usePosts";

const Posts = () => {
  const token = useSelector((state) => state.auth.token);
  const { data: posts } = usePosts(token);
  const { theme } = useTheme();

  return (
    <div className="flex flex-col justify-center items-center max-w-[756px] w-full gap-y-2 ">
      {posts
        ?.slice()
        .reverse()
        .map((post) => (
          <>
            <div
              key={post._id}
              className={`w-full  px-4 py-1  ${theme.hoverBackground} cursor-pointer rounded-lg `}
            >
              <div className={`flex items-center gap-1 `}>
                <img
                  src={`http://localhost:3001/assets/${post.community?.picturePath}`}
                  alt=""
                  className="w-7 h-7 rounded-full"
                />
                <p className="text-sm font-medium opacity-90">
                  f/{post.community.communityName}
                  <span className="opacity-70 font-normal">• 1 day ago</span>
                </p>
              </div>
              <p className=" font-medium text-xl mt-1">{post.title}</p>
              <p className="mt-2">{post.content}</p>
              {post.picturePath === "undefined" ? null : (
                <div
                  className={`w-full relative flex items-center justify-center bg-contain rounded-xl mt-3 border ${theme.borderGray}`}
                >
                  <div
                    className={`absolute max-w-[722px] max-h-[430px] w-full h-full rounded-xl`}
                    style={{
                      backgroundImage: `url('http://localhost:3001/assets/${post?.picturePath}')`,
                      backgroundSize: "350% 360%",
                      backgroundPosition: "center",
                      imageRendering: "smooth",
                      filter: "blur(3px)",
                    }}
                  />
                  <img
                    src={`http://localhost:3001/assets/${post?.picturePath}`}
                    alt=""
                    className="z-10 max-w-[724px] max-h-[540px] h-full  object-contain select-none"
                  />
                </div>
              )}
              <div className="flex items-center gap-3 mt-3">
                <div
                  className={` relative w-20 h-9 flex items-center rounded-full space-between  ${theme.secondaryBackground}`}
                >
                  <div className={`w-9 h-9 flex items-center  `}>
                    <PiArrowFatUp
                      className={` w-full h-full rounded-full px-2 py-1  cursor-pointer ${theme.upVote} ${theme.secondaryHoverBackground} ${theme.activeBackground}  `}
                    />
                  </div>

                  <p className="select-none">0</p>
                  <div className={` w-9 h-9 flex items-center  `}>
                    <PiArrowFatDown
                      className={`w-full h-full rounded-full px-2 py-1  cursor-pointer ${theme.downVote} ${theme.secondaryHoverBackground} ${theme.activeBackground}`}
                    />
                  </div>
                </div>
                <div
                  className={`w-20 h-9 rounded-full   ${theme.secondaryBackground} `}
                >
                  <div
                    className={`w-full h-full flex items-center rounded-full justify-center gap-3 px-2 py-1 ${theme.secondaryHoverBackground} ${theme.activeBackground}`}
                  >
                    <GoComment className="w-5 h-5" />
                    <p className="select-none*">31</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={`w-full h-px ${theme.grayBackground}`} />
          </>
        ))}
    </div>
  );
};

export default Posts;
