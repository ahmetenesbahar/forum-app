import React from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Sidebar from "components/Sidebar";
import Navbar from "components/Navbar";
import AuthPage from "components/AuthPage";
import Main from "components/Main";
import { useTheme } from "components/contexts/ThemeContext";
import ProfilePage from "components/users/ProfilePage";
import PostDetail from "components/posts/PostDetail";
import CommunityProfile from "components/communities/CommunityProfile";

const App = () => {
  const { theme } = useTheme();

  return (
    <BrowserRouter>
      <div className={` ${theme.background} ${theme.text}`}>
        <Navbar />
        <AuthPage />
        <div className="flex">
          <Sidebar />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/users/:userId" element={<ProfilePage />} />
            <Route path="/posts/:postId" element={<PostDetail />} />
            <Route
              path="/communities/:communityId"
              element={<CommunityProfile />}
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
