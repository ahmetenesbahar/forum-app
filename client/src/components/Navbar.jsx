import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "../state/index";
import { useNavigate } from "react-router-dom";
import { getTheme } from "theme";
import { FaHome } from "react-icons/fa";
import { ReactComponent as Logod20 } from "../assets/Logod20.svg";
import Searchbar from "./Searchbar";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const mode = useSelector((state) => state.mode);
  const theme = getTheme(mode);
  return (
    <div
      className={`justify-between items-center flex px-4 border-b w-full ${theme.borderGray}`}
    >
      <div className="logo">
        <Logod20 className={`${theme.logo}`} fill="currentColor" />
      </div>
      <div className="searchbar w-2/5 ">
        <Searchbar theme={theme} />
      </div>
      <div className="user-actions">asd</div>
    </div>
  );
};

export default Navbar;
