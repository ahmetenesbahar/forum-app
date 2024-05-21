import React from "react";
import { useTheme } from "./contexts/ThemeContext";
import UserDisplay from "./users/UserDisplay";

const SearchResults = ({ results }) => {
  const { theme } = useTheme();
  return (
    <div
      className={`absolute w-full h-48 top-12 text-white  overflow-auto z-30 ${theme.secondaryBackground} rounded-xl overflow-auto scrollbar   ${theme.scrollbarTrack}  scrollbar-thin ${theme.scrollbarThumb} `}
    >
      <div className="flex flex-col px-4 py-2">
        <p className="text-lg font-medium">Users</p>
        <div className={`w-full h-px ${theme.grayBackground}`} />
        <div className="flex flex-col">
          <UserDisplay />
          {results?.users?.map((user) => user?.profileName)}
        </div>
        <div>
          <p className="text-lg font-medium">Communities</p>
          <div className={`w-full h-px ${theme.grayBackground}`} />
          <div>
            {results?.communities.map((community) => community?.communityName)}
          </div>
        </div>
        <div>
          <p className="text-lg font-medium">Posts</p>
          <div className={`w-full h-px ${theme.grayBackground}`} />
          <div>{results?.posts?.map((post) => post?.title)}</div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
