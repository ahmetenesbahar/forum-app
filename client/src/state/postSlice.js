import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: "posts",
  initialState: {
    postId: null,
  },
  reducers: {
    setPostId: (state, action) => {
      state.postId = action.payload;
    },
  },
});
export const { setPostId } = postSlice.actions;
export default postSlice.reducer;
