import React, { useState } from "react";
import { useTheme } from "components/contexts/ThemeContext";
import { RiArrowUpSLine } from "react-icons/ri";

const CommunityDisplay = ({ results }) => {
  const { theme } = useTheme();
  const [isShowing, setIsShowing] = useState(true);
  return (
    <div>
      <div
        className={`flex items-center justify-between px-2 cursor-pointer ${theme.secondaryHoverBackground}`}
        onClick={() => setIsShowing(!isShowing)}
      >
        <p className="text-lg font-medium px-4 py-1">Communities</p>
        {results?.communities.length > 0 && (
          <RiArrowUpSLine
            className={
              isShowing
                ? "w-6 h-6 rotate-0 ease-linear duration-75 "
                : "w-6 h-6 rotate-180 ease-linear duration-75"
            }
          />
        )}
      </div>
      <div className={`w-full h-px ${theme.grayBackground}`} />
      {isShowing &&
        results?.communities?.map((community) => (
          <div
            className={`flex items-center gap-3 cursor-pointer py-1 px-4 ${theme.secondaryHoverBackground}`}
          >
            <img
              src={`http://localhost:3001/assets/${community?.picturePath}`}
              alt="community avatar"
              className="w-8 h-8 rounded-full"
            />
            <p className="font-semibold text-base">
              f/{community?.communityName}
            </p>
          </div>
        ))}
    </div>
  );
};

export default CommunityDisplay;
