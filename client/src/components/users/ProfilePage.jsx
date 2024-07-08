import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import useUser from "hooks/useUser";
import { useTheme } from "components/contexts/ThemeContext";

const ProfilePage = ({ userId }) => {
  const token = useSelector((state) => state.auth.token);
  const { data: user } = useUser(token, userId);
  const { theme } = useTheme();

  useEffect(() => {
    console.log(user);
  });

  return (
    <div className="relative flex py-2 justify-center w-full gap-2">
      <div className="">
        <div>
          <img
            src={`http://localhost:3001/assets/${user?.picturePath}`}
            className={` rounded-full w-8 h-8 ${theme.secondaryBackground} `}
          />
        </div>
      </div>
    </div>
  );
};

ProfilePage.displayName = "ProfilePage";
export default ProfilePage;
