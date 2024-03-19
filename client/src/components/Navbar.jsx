import React from "react";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Switch } from "@headlessui/react";
import { setMode, setLogout, setShowForm } from "../state/index";

import { FaPlus } from "react-icons/fa6";
import { FaRegBell } from "react-icons/fa6";
import { FiSettings } from "react-icons/fi";
import { RiLogoutBoxLine } from "react-icons/ri";
import { RiMoonLine } from "react-icons/ri";

import { ReactComponent as Logod20 } from "../assets/Logod20.svg";
import Searchbar from "./Searchbar";

const Navbar = ({ theme }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const mode = useSelector((state) => state.mode);

  const [enabled, setEnabled] = useState(mode === "dark" ? true : false);
  const [showActionMenu, setShowActionMenu] = useState(false);

  const menuRef = useRef(null);

  const handleLogout = () => {
    dispatch(setLogout());
    setShowActionMenu(false);
  };

  useEffect(() => {
    if (enabled) {
      dispatch(setMode("dark"));
    } else {
      dispatch(setMode("light"));
    }
  }, [enabled]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showActionMenu &&
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setTimeout(() => {
          setShowActionMenu(false);
        }, 10);
      }
    };

    document.addEventListener("mouseup", handleClickOutside);

    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, [showActionMenu]);

  return (
    <div
      className={`justify-between items-center flex px-8 border-b w-full ${theme.borderGray} relative`}
    >
      <div className="logo">
        <Logod20 className={`${theme.logo} cursor-pointer`} fill={theme.logo} />
      </div>
      <div className="searchbar w-2/5 ">
        <Searchbar theme={theme} />
      </div>
      <div className="user-actions flex items-center justify-center gap-3">
        <div
          className={`rounded-full w-18 px-3 py-2 flex items-center justify-center ${theme.hoverBackground}  cursor-pointer gap-2 font-semibold`}
        >
          <FaPlus className={`w-6 h-6 ${theme.text} `} />
          Create
        </div>
        <FaRegBell
          className={`w-10 h-10 ${theme.text} cursor-pointer ${theme.hoverBackground} rounded-full p-2`}
        />
        <div
          className={`user-avatar cursor-pointer ${theme.hoverBackground} rounded-full p-1`}
        >
          {user == null ? (
            <p
              className="font-semibold cursor-pointer px-2 py-1"
              onClick={() => dispatch(setShowForm(true))}
            >
              Login
            </p>
          ) : (
            <img
              src={`http://localhost:3001/assets/${user?.picturePath}`}
              className={` rounded-full w-8 h-8 ${theme.secondaryBackground} `}
              onClick={() => setShowActionMenu(!showActionMenu)}
            />
          )}
        </div>
      </div>
      <div
        className={` user-actions-menu min-w-[256px] font-semibold  absolute end-8 top-20  py-2 rounded-md ${
          theme.background
        } ${theme.borderGray} ${theme.text} shadow-md ${theme.text} ${
          showActionMenu ? "block" : "hidden"
        } `}
        ref={menuRef}
      >
        <div
          className={`user-actions-item py-2 pr-6 pl-4 flex items-center gap-3 cursor-pointer ${theme.hoverBackground}`}
        >
          <div>
            <div
              className={`user-avatar cursor-pointer ${theme.hoverBackground} rounded-full
              `}
            >
              <img
                src={`http://localhost:3001/assets/${user?.picturePath}`}
                className={` rounded-full w-8 h-8 ${theme.secondaryBackground} `}
              />
            </div>
          </div>
          <div>
            <p>View Profile</p>
            <p className="text-xs">u/{user?.profileName}</p>
          </div>
        </div>
        <div className="user-actions-item pl-4 py-2 pr-6 gap-3 flex items-center ">
          <RiMoonLine className="w-6 h-6 " />
          <div className="flex items-center gap-8">
            Dark Mode
            <Switch
              checked={enabled}
              onChange={setEnabled}
              className={`${
                enabled ? "bg-blue-600" : `${theme.secondaryBackground}`
              } relative inline-flex h-8 w-12 items-center rounded-full focus:outline-none`}
            >
              <span className="sr-only">Enable notifications</span>
              <span
                className={`${
                  enabled ? "translate-x-6" : "translate-x-1"
                } inline-block h-6 w-6 transform rounded-full bg-white transition`}
              />
            </Switch>
          </div>
        </div>
        <div
          className={`user-actions-item py-2 pr-6 pl-4 flex gap-3 cursor-pointer ${theme.hoverBackground}`}
        >
          <FiSettings className="w-6 h-6 " />
          Settings
        </div>
        <div
          className={`user-actions-item py-2 pr-6 pl-4 flex gap-3 cursor-pointer ${theme.hoverBackground}`}
          onClick={handleLogout}
        >
          <RiLogoutBoxLine className="w-6 h-6" />
          Log Out
        </div>
      </div>
    </div>
  );
};

export default Navbar;
