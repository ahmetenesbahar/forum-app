import React from "react";
import { useTheme } from "./contexts/ThemeContext";
import UserDisplay from "./users/UserDisplay";
import CommunityDisplay from "./communities/CommunityDisplay";
import PostDisplay from "./posts/PostDisplay";

const SearchResults = ({ results }) => {
  const { theme } = useTheme();
  return (
    <div
      className={`absolute w-full h-48 top-12 text-white  overflow-auto z-30 ${theme.secondaryBackground} rounded-xl overflow-auto scrollbar   ${theme.scrollbarTrack}  scrollbar-thin ${theme.scrollbarThumb} `}
    >
      <div className="flex flex-col">
        <p className="text-lg font-medium px-4 py-1">Users</p>
        <div className={`w-full h-px ${theme.grayBackground}`} />
        <UserDisplay results={results} />
        <div>
          <p className="text-lg font-medium px-4  py-1">Communities</p>
          <div className={`w-full h-px ${theme.grayBackground}`} />
          <CommunityDisplay results={results} />
        </div>
        <div>
          <p className="text-lg font-medium px-4  py-1">Posts</p>
          <div className={`w-full h-px ${theme.grayBackground}`} />
          <PostDisplay results={results} />
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
