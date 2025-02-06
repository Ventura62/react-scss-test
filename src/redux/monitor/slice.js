import { createSlice } from "@reduxjs/toolkit";

import {
  getAllHealthMetrics,
  getAllProtocolsMetrics
} from "src/redux/actions";

const initialState = {
  loading: false,
  healthMetrics: [],
  healthMetricsObtained: false,
  protocolsMetrics: [],
  protocolsObtained: false
};

const monitorSlice = createSlice({
  name: "monitor",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllHealthMetrics.fulfilled, (state, action) => {
      state.healthMetricsObtained = true;
      state.login = false;
      state.healthMetrics = action.payload && action.payload.length > 0 ? action.payload : [];
    })
    builder.addCase(getAllHealthMetrics.rejected, (state, action) => {
      state.healthMetricsObtained = false;
      state.login = false;
    })
    builder.addCase(getAllHealthMetrics.pending, (state, action) => {
      state.healthMetricsObtained = false;
      state.login = true;
    })
    builder.addCase(getAllProtocolsMetrics.fulfilled, (state, action) => {
      state.protocolsObtained = true;
      state.login = false;
      state.protocolsMetrics = action.payload && action.payload.length > 0 ? action.payload : [];
    })
    builder.addCase(getAllProtocolsMetrics.rejected, (state, action) => {
      state.protocolsObtained = false;
      state.login = false;
    })
    builder.addCase(getAllProtocolsMetrics.pending, (state, action) => {
      state.protocolsObtained = false;
      state.login = true;
    })
  }
});

export default monitorSlice.reducer;