import React, { useState } from "react";
import { useTheme } from "components/contexts/ThemeContext";
import { RiArrowUpSLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const UserDisplay = ({ results }) => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const [isShowing, setIsShowing] = useState(true);

  return (
    <div>
      <div
        className={`flex items-center justify-between px-2 cursor-pointer ${theme.secondaryHoverBackground}`}
        onClick={() => setIsShowing(!isShowing)}
      >
        <p className="text-lg font-medium px-4 py-1">Users</p>
        {results?.users.length > 0 && (
          <RiArrowUpSLine
            className={
              isShowing
                ? "w-6 h-6 rotate-0 ease-linear duration-75 "
                : "w-6 h-6 rotate-180 ease-linear duration-75"
            }
          />
        )}
      </div>
      <div className={`w-full h-px ${theme.grayBackground}`} />
      {isShowing &&
        results?.users?.map((user) => (
          <div
            className={`flex items-center gap-3 cursor-pointer py-1 px-4 ${theme.secondaryHoverBackground}`}
            onClick={() => {
              navigate(`users/${user._id}`);
            }}
          >
            <img
              src={`http://localhost:3001/assets/${user?.picturePath}`}
              alt="user avatar"
              className="w-8 h-8 rounded-full"
            />
            <p className="font-semibold text-base">{user?.profileName}</p>
          </div>
        ))}
    </div>
  );
};

UserDisplay.displayName = "UserDisplay";
export default UserDisplay;
