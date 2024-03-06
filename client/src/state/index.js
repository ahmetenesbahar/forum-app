import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
  user: null,
  token: null,
  isRegistered: false,
  posts: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setCommunities: (state, action) => {
      if (state.user) {
        state.user.categories = action.payload.categories;
      } else {
        console.error("user categories non existent");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post_id) {
          return action.payload.post;
        }
      });
      state.posts = updatedPosts;
    },
    setRegistered: (state) => {
      state.isRegistered = true;
    },
  },
});

export const {
  setMode,
  setLogin,
  setLogout,
  setCommunities,
  setPosts,
  setPost,
  setRegistered,
} = authSlice.actions;

export default authSlice.reducer;
