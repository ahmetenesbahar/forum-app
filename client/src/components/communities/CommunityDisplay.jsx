import React from "react";
import { useTheme } from "components/contexts/ThemeContext";

const CommunityDisplay = ({ results }) => {
  const { theme } = useTheme();
  return (
    <div>
      {results?.communities?.map((community) => (
        <div
          className={`flex items-center gap-3 cursor-pointer py-1 px-4 ${theme.hoverBackground}`}
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
