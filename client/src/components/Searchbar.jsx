import React, { useEffect, useState } from "react";
import { RiSearchLine, RiCloseLine } from "react-icons/ri";
import { useTheme } from "./contexts/ThemeContext";
import useSearch from "hooks/useSearch";

const Searchbar = () => {
  const { theme } = useTheme();
  const [parameter, setParameter] = useState("");
  const { data: result, mutate: mutateSearch } = useSearch(parameter || "");

  useEffect(() => {}, [parameter]);

  return (
    <div className="flex flex-col relative">
      <div className="relative flex items-center">
        <RiSearchLine className="absolute left-3 w-5 h-5" />
        <input
          type="text"
          onChange={(e) => {
            setParameter(e.target.value);
            mutateSearch();
          }}
          value={parameter}
          placeholder="Search on ForumD20"
          className={`${theme.secondaryBackground} ${theme.hoverBackground} rounded-full px-10 w-full h-10 focus:outline-none`}
        />
        <RiCloseLine
          className="absolute right-3 w-5 h-5 cursor-pointer"
          onClick={() => setParameter("")}
        />
      </div>
      {parameter && (
        <div className="absolute w-2/5 h-48 text-white bg-red-500 overflow-auto z-30  ">
          <div className="flex flex-col">
            <p>Users</p>
            <div className="flex">
              {result?.users?.map((user) => user?.profileName)}
            </div>
          </div>
          <div>
            <p>Communities</p>
            <div>
              {result?.communities?.map(
                (community) => community?.communityName
              )}
            </div>
          </div>
          <div>
            <p>Posts</p>
            <div>{result?.posts?.map((post) => post?.title)}</div>
          </div>
        </div>
      )}
    </div>
  );
};

Searchbar.displayName = "Searchbar";
export default Searchbar;
