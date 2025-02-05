import { createSlice } from "@reduxjs/toolkit";

import {
  getAllInterfaceMetrics
} from "src/redux/actions";

const initialState = {
  loadedFirstTime: false,
  loading: false,
  interfaces: []
};

const configureSlice = createSlice({
  name: "configure",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllInterfaceMetrics.fulfilled, (state, action)=>{
      state.loadedFirstTime = true;
      state.login = false;
      state.interfaces = action.payload && action.payload.length > 0 ? action.payload : [];
    })
    builder.addCase(getAllInterfaceMetrics.rejected, (state, action) => {
      state.loadedFirstTime = false;
      state.login = false;
    })
    builder.addCase(getAllInterfaceMetrics.pending, (state, action) => {
      state.loadedFirstTime = false;
      state.login = true;
    })
  }
});

export default configureSlice.reducer;