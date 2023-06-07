import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: { modalIsOpen: false },
  reducers: {
    openModal: (state) => {
      state.modalIsOpen = true;
    },
    closeModal: (state) => {
      state.modalIsOpen = false;
    },
    toggleModal: (state) => {
      state.modalIsOpen = !state.modalIsOpen;
    },
  },
});

export const { openModal, closeModal, toggleModal } = modalSlice.actions;
export default modalSlice.reducer;
