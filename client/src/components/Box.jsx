import React, { useState } from "react";
import { useTheme } from "./contexts/ThemeContext";

const Box = () => {
  const { theme } = useTheme();
  const [clearHandle, setClearHandle] = useState(false);

  return (
    <div
      className={
        clearHandle
          ? ` max-w-[305px] h-[820px] w-full`
          : `max-w-[305px] h-[820px] w-full sticky top-[8px] rounded-2xl ${theme.boxBackground} hover:overflow-auto`
      }
    >
      <div
        className={
          clearHandle
            ? `hidden`
            : "flex justify-between items-center px-4 py-2 select-none"
        }
      >
        <p className="text-sm opacity-70 font-light">RECENT POSTS</p>
        <p
          className="text-blue-400 cursor-pointer"
          onClick={() => {
            setClearHandle(!clearHandle);
          }}
        >
          Clear
        </p>
      </div>
    </div>
  );
};

export default Box;
