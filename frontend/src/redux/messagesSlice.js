import { createSlice } from "@reduxjs/toolkit";

export const messagesSlice = createSlice({
  name: "messages",
  initialState: {
    messages: [],
  },
  reducers: {
    setUserMessages: (state, action) => {
      state.messages = action.payload;
    },
  },
});
export const { setUserMessages } = messagesSlice.actions;

export default messagesSlice.reducer;
