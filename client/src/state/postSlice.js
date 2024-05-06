// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// export const fetchPosts = createAsyncThunk("post/getPosts", async (token) => {
//   try {
//     const response = await axios.get("http://localhost:3001/posts/getPosts", {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return response.data;
//   } catch (err) {
//     console.error(err);
//     throw err;
//   }
// });

// export const postSlice = createSlice({
//   name: "posts",
//   initialState: {
//     posts: [],
//     status: "idle",
//     error: null,
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchPosts.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchPosts.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.posts = action.payload;
//       })
//       .addCase(fetchPosts.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message;
//       });
//   },
// });

// export const selectAllPosts = (state) => state.posts.posts;

// export default postSlice.reducer;

//! Bu kodun kullanımına gerek kalmadı gibi gözüküyor, yine de burada bulunmasında fayda görüyorum. Bu kodun yerine usePosts.js dosyasındaki kodu kullanıyorum.
