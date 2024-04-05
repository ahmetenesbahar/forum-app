import React, { useEffect, useState } from "react";
import { useTheme } from "./contexts/ThemeContext";
import { Transition } from "@headlessui/react";
import { RiArrowUpSLine, RiArrowDownSLine } from "react-icons/ri";

const Sidebar = () => {
  const { theme } = useTheme();
  const [isShowing, setIsShowing] = useState(true);
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
    <div className={`${theme.borderGray} border-r-2 w-80`}>
      <div className="communities">
        <div
          className={`flex items-center cursor-pointer ${theme.hoverBackground}`}
          onClick={() => setIsShowing((isShowing) => !isShowing)}
        >
          <h1 className={`${theme.text} text-lg font-bold p-4 select-none `}>
            Communities
          </h1>

          <RiArrowUpSLine
            className={
              isShowing
                ? "w-6 h-6 rotate-0 ease-linear duration-75 "
                : "w-6 h-6 rotate-180 ease-linear duration-75"
            }
          />
        </div>
        <Transition
          show={isShowing}
          enter="transition-opacity duration-75"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <ul>
            {communities.map((community) => (
              <li
                key={community._id}
                className={`${theme.text} p-3 border-b ${theme.borderGray} ${theme.hoverBackground} hover:cursor-pointer select-none`}
              >
                <div className="flex gap-2 items-center ">
                  <img
                    src={`http://localhost:3001/assets/${community?.picturePath}`}
                    alt=""
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <h3 className="font-medium ">
                    <span className="font-normal ">f/</span>
                    {community.communityName}
                  </h3>
                </div>
              </li>
            ))}
          </ul>
        </Transition>
      </div>
    </div>
  );
};

export default Sidebar;
