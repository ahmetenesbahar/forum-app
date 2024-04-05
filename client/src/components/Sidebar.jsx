import React, { useEffect, useState } from "react";
import { useTheme } from "./contexts/ThemeContext";

const Sidebar = () => {
  const { theme } = useTheme();
  const [communities, setCommunities] = useState([]);
  useEffect(() => {
    try {
      const fetchCommunities = async () => {
        const response = await fetch("http://localhost:3001/communities");
        const data = await response.json();
        setCommunities(data);
      };
      fetchCommunities();
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div className={`${theme.borderGray} border-r-2 w-1/6`}>
      <h1 className={`${theme.text} text-lg font-bold p-4 `}>Communities</h1>
      <ul>
        {communities.map((community) => (
          <li
            key={community._id}
            className={`${theme.text} p-3 border-b ${theme.borderGray} ${theme.hoverBackground} hover:cursor-pointer`}
          >
            <div className="flex gap-2 items-center ">
              <img
                src={`http://localhost:3001/assets/${community?.picturePath}`}
                alt=""
                className="w-8 h-8 rounded-full object-cover"
              />
              <h3 className="font-medium">
                <span className="font-normal">f/</span>
                {community.communityName}
              </h3>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
