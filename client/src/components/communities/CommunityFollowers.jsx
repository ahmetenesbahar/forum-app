import React from "react";
import { useTheme } from "components/contexts/ThemeContext";
import { useNavigate } from "react-router-dom";

const CommunityFollowers = ({ community }) => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString("tr-TR", options);
  };
  return (
    <div className="flex flex-col items-center max-w-[756px] w-full gap-y-2">
      {community?.interestedUsers
        ?.slice()
        .reverse()
        .map((user) => (
          <div className="w-full cursor-pointer">
            <div
              className={`flex gap-3 items-center ${theme.hoverBackground} rounded-lg p-4`}
              onClick={() => {
                navigate(`/users/${user._id}`);
              }}
            >
              <img
                src={`http://localhost:3001/assets/${user?.picturePath}`}
                className={` rounded-full w-24 h-24 ${theme.secondaryBackground} `}
              />
              <div className="flex flex-col gap-2">
                <p className="text-xl font-semibold">{user?.profileName}</p>
                <p className="text-sm">{formatDate(user?.createdAt)}</p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default CommunityFollowers;
