import React from "react";
import { useTheme } from "components/contexts/ThemeContext";

const UserDisplay = ({ results }) => {
  const { theme } = useTheme();
  return (
    <div>
      {results?.users?.map((user) => (
        <div
          className={`flex items-center gap-3 cursor-pointer py-1 px-4 ${theme.hoverBackground}`}
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

export default UserDisplay;
