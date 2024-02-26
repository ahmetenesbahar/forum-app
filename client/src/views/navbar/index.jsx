import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "../../state/index";
import { useNavigate } from "react-router-dom";
import { getTheme } from "theme";
import { FaHome } from "react-icons/fa";
import { ReactComponent as logod20 } from "logod20.svg";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const mode = useSelector((state) => state.mode);
  const theme = getTheme(mode);
  //! Buraya gerek yok gibi :D
  return (
    <div
      className={`justify-between items-center flex px-8 py-2 ${theme.navBackground}`}
    >
      <div className="logo">
        <logod20 />
      </div>
      <div className="searchbar">asd</div>
      <div className="user-actions">asd</div>
    </div>
  );
};

export default Navbar;
