import React from "react";
import { RiSearchLine } from "react-icons/ri";

const Searchbar = ({ theme }) => {
  return (
    <div className="relative flex items-center">
      <RiSearchLine className="absolute left-3 w-5 h-5" />
      <input
        type="text"
        onChange={""}
        placeholder="Search on ForumD20"
        className={`${theme.secondaryBackground} ${theme.hoverBackground} rounded-full px-10 w-full h-10 focus:outline-none`}
      />
    </div>
  );
};

export default Searchbar;
