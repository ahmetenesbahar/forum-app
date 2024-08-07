import React, { useEffect, useState, Fragment } from "react";
import { useTheme } from "./contexts/ThemeContext";
import { Transition } from "@headlessui/react";
import { RiArrowUpSLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import useCommunities from "hooks/useCommunities";

const Sidebar = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [isShowing, setIsShowing] = useState(true);
  const { data: communities } = useCommunities();

  return (
    <div className={`${theme.borderGray} border-r-2 w-80 p-4`}>
      <div className={isShowing ? `` : `border-b ${theme.borderGray} `}>
        <div
          className={`flex items-center cursor-pointer relative z-20 rounded-md ${theme.hoverBackground}`}
          onClick={() => setIsShowing((isShowing) => !isShowing)}
        >
          <h1
            className={`${theme.text} text-md font-medium py-2 px-4 select-none `}
          >
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
          enter="transition duration-100 ease-out"
          enterFrom="opacity-0 -translate-y-5"
          enterTo="opacity-100 translate-y-0"
          leave="transition duration-100 ease-out"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 -translate-y-5"
        >
          <ul className={`border-b ${theme.borderGray}`}>
            {communities?.map((community) => (
              <li
                key={community._id}
                className={`${theme.text} min-h-[40px] px-2 py-1 rounded-md   ${theme.hoverBackground}  hover:cursor-pointer select-none`}
                onClick={() => {
                  navigate(`/communities/${community._id}`);
                }}
              >
                <div className="flex gap-2 items-center ">
                  <img
                    src={`http://localhost:3001/assets/${community?.picturePath}`}
                    alt=""
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <h3 className="font-normal ">
                    <span>f/</span>
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

Sidebar.displayName = "Sidebar";
export default Sidebar;
