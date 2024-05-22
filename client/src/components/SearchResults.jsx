import React, { useState } from "react";
import { useTheme } from "./contexts/ThemeContext";
import UserDisplay from "./users/UserDisplay";
import CommunityDisplay from "./communities/CommunityDisplay";
import PostDisplay from "./posts/PostDisplay";
import { RiArrowUpSLine } from "react-icons/ri";

const SearchResults = ({ results }) => {
  const { theme } = useTheme();

  return (
    <div
      className={`absolute w-full max-h-48 top-12 text-white  overflow-auto z-30 ${theme.secondaryBackground} rounded-xl overflow-auto scrollbar   ${theme.scrollbarTrack}  scrollbar-thin ${theme.scrollbarThumb} `}
    >
      <div className="flex flex-col">
        <UserDisplay results={results} />
        <CommunityDisplay results={results} />
        <PostDisplay results={results} />
      </div>
    </div>
  );
};

export default SearchResults;
