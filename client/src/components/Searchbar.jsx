import React, { useState } from "react";
import { RiSearchLine, RiCloseLine } from "react-icons/ri";
import { useTheme } from "./contexts/ThemeContext";
import useSearch from "hooks/useSearch";
import SearchResults from "./SearchResults";

const Searchbar = () => {
  const { theme } = useTheme();
  const [parameter, setParameter] = useState("");
  const { data: result } = useSearch(parameter);

  return (
    <div className="flex flex-col relative">
      <div className="relative flex items-center">
        <RiSearchLine className="absolute left-3 w-5 h-5" />
        <input
          type="text"
          onChange={(e) => {
            setParameter(e.target.value);
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
      {parameter && <SearchResults results={result} />}
    </div>
  );
};

Searchbar.displayName = "Searchbar";
export default Searchbar;
