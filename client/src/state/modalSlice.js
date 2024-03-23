import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showCreateModal: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setShowCreateModal: (state, action) => {
      state.showCreateModal = action.payload.setShowCreateModal;
    },
  },
});

export const { setShowCreateModal } = modalSlice.actions;

export default modalSlice.reducer;
