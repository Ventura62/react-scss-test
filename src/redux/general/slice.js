import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loadedFirstTime:false,
  loading:false,
  notifications:[]
};

const generalSlice = createSlice({
  name: "general",
  initialState: initialState,
  reducers: {
    addNotification: (state, action) => {
      state.notifications.push(action.payload)
    }
  }
});

export const {addNotification} = generalSlice.actions;
export default generalSlice.reducer;