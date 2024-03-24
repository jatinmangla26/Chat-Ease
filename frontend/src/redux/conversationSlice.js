import { createSlice } from "@reduxjs/toolkit";

export const conversationSlice = createSlice({
  name: "selectedConversation",
  initialState: {
    selectedConversation: null,
  },
  reducers: {
    setSelectedConversation: (state, action) => {
      state.selectedConversation = action.payload;
    },
  },
});
export const { setSelectedConversation } = conversationSlice.actions;

export default conversationSlice.reducer;
