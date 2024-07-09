import React, { useEffect, useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";

import UserPosts from "./UserPosts";
import UserUpVotes from "./UserUpVotes";
import UserDownVotes from "./UserDownVotes";
import useUser from "hooks/useUser";
import { useTheme } from "components/contexts/ThemeContext";
import { Tab } from "@headlessui/react";
import { RiArrowLeftFill } from "react-icons/ri";

const ProfilePage = ({ userId, handleGoBack }) => {
  const token = useSelector((state) => state.auth.token);
  const { data: user } = useUser(token, userId);
  const { theme } = useTheme();
  const dispatch = useDispatch();

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString("tr-TR", options);
  };

  return (
    <div className="relative flex py-2 justify-center w-full">
      <div
        className={`flex items-center justify-center w-8 h-8 rounded-full ${theme.secondaryBackground}   cursor-pointer absolute left-32`}
        onClick={() => {
          handleGoBack();
        }}
      >
        <RiArrowLeftFill
          className={`w-8 h-8 ${theme.hoverUpVote} rounded-full`}
        />
      </div>
      <div className="flex flex-col items-start max-w-[756px] w-full">
        <div className="flex justify-center items-center gap-3">
          <img
            src={`http://localhost:3001/assets/${user?.picturePath}`}
            className={` rounded-full w-24 h-24 ${theme.secondaryBackground} `}
          />
          <div className="flex flex-col gap-2">
            <p className="text-xl font-semibold">{user?.profileName}</p>
            <p className="text-sm">{formatDate(user?.createdAt)}</p>
          </div>
        </div>
        <div className="flex flex-col w-full justify-center items-center mt-10 p-5">
          <Tab.Group>
            <Tab.List className={"flex gap-16"}>
              <Tab as={Fragment}>
                {({ selected }) => (
                  <button
                    className={`mx-2 min-w-[180px] ${
                      selected
                        ? `${theme.primary} text-white px-4 py-2 font-semibold rounded-full  focus:outline-none`
                        : `${theme.secondaryBackground}  ${theme.text} px-4 py-2 font-semibold rounded-full mx-2`
                    }`}
                  >
                    Posts
                  </button>
                )}
              </Tab>
              <Tab as={Fragment}>
                {({ selected }) => (
                  <button
                    className={`mx-2 min-w-[180px] ${
                      selected
                        ? `${theme.primary} text-white px-4 py-2 font-semibold rounded-full  focus:outline-none`
                        : `${theme.secondaryBackground}  ${theme.text} px-4 py-2 font-semibold rounded-full mx-2`
                    }`}
                  >
                    Upvoted
                  </button>
                )}
              </Tab>
              <Tab as={Fragment}>
                {({ selected }) => (
                  <button
                    className={`mx-2 min-w-[180px] ${
                      selected
                        ? `${theme.primary} text-white px-4 py-2 font-semibold rounded-full  focus:outline-none`
                        : `${theme.secondaryBackground}  ${theme.text} px-4 py-2 font-semibold rounded-full mx-2`
                    }`}
                  >
                    Downvoted
                  </button>
                )}
              </Tab>
            </Tab.List>
            <div className={`w-full h-px mt-5 ${theme.grayBackground}`} />
            <Tab.Panels className="mt-3 w-full">
              <Tab.Panel>
                <UserPosts userId={userId} />
              </Tab.Panel>
              <Tab.Panel>
                <UserUpVotes userId={userId} />
              </Tab.Panel>
              <Tab.Panel>
                <UserDownVotes userId={userId} />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </div>
  );
};

ProfilePage.displayName = "ProfilePage";
export default ProfilePage;
