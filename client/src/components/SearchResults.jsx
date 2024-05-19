import React from "react";

const SearchResults = ({ results }) => {
  return (
    <div className="absolute w-2/5 h-48 text-white  overflow-auto z-30">
      <div className="flex flex-col">
        <p>Users</p>
        <div className="flex">
          {results?.users?.map((user) => user?.profileName)}
        </div>
      </div>
      <div>
        <p>Communities</p>
        <div>
          {results?.communities.map((community) => community?.communityName)}
        </div>
      </div>
      <div>
        <p>Posts</p>
        <div>{results?.posts?.map((post) => post?.title)}</div>
      </div>
    </div>
  );
};

export default SearchResults;
