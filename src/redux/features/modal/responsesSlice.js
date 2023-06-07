// responsesSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  responses: [],
};

const responsesSlice = createSlice({
  name: "responses",
  initialState,
  reducers: {
    addResponse: (state, action) => {
      state.responses.push(action.payload);
    },
    clearResponses: (state) => {
      state.responses = [];
    },
  },
});

export const { addResponse, clearResponses } = responsesSlice.actions;

export default responsesSlice.reducer;
