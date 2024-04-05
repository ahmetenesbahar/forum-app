import React, { Fragment } from "react";
import { useTheme } from "components/contexts/ThemeContext";
import { Tab } from "@headlessui/react";
import CreateCommunityForm from "components/communities/CreateCommunityForm";
import CreatePostForm from "components/posts/CreatePostForm";

const CreateTab = () => {
  const { theme } = useTheme();

  return (
    <Tab.Group>
      <Tab.List>
        <Tab as={Fragment}>
          {({ selected }) => (
            <button
              className={`mx-2 min-w-[180px] ${
                selected
                  ? `${theme.primary} text-white px-4 py-2 font-semibold rounded-full  focus:outline-none`
                  : `${theme.secondaryBackground}  ${theme.text} px-4 py-2 font-semibold rounded-full mx-2`
              }`}
            >
              Create Post
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
              Create Community
            </button>
          )}
        </Tab>
      </Tab.List>
      <Tab.Panels className="mt-3">
        <Tab.Panel>
          <CreatePostForm theme={theme} />
        </Tab.Panel>
        <Tab.Panel>
          <CreateCommunityForm theme={theme} />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};

export default CreateTab;
