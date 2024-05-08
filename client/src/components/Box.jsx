import React, { useState } from "react";
import { useTheme } from "./contexts/ThemeContext";

import LatestPosts from "./posts/LatestPosts";

const Box = () => {
  const { theme } = useTheme();
  const [clearHandle, setClearHandle] = useState(false);

  return (
    <div
      className={
        clearHandle
          ? ` max-w-[305px] max-h-[820px] w-full`
          : ` max-w-[305px] max-h-[820px] h-max w-full sticky top-[8px] !rounded-2xl p-4 ${theme.boxBackground} overflow-hidden hover:overflow-auto scrollbar ${theme.boxScrollbar}  ${theme.boxScrollbarTrack}  scrollbar-thin  `
      }
    >
      <div
        className={
          clearHandle
            ? `hidden`
            : "flex justify-between items-center select-none"
        }
      >
        <p className="text-xs opacity-70 font-light uppercase">recent posts</p>
        <p
          className="text-blue-400 cursor-pointer text-sm"
          onClick={() => {
            setClearHandle(!clearHandle);
          }}
        >
          Clear
        </p>
      </div>
      <div className={clearHandle ? "hidden" : "flex flex-col mt-2 "}>
        <LatestPosts />
      </div>
    </div>
  );
};

Box.displayName = "Box";
export default Box;
