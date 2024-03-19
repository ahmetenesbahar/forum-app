import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  createModalOpen: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setCreateModalOpen: (state, action) => {
      state.createModalOpen = action.payload;
    },
  },
});
