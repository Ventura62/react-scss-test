import { configureStore } from '@reduxjs/toolkit';
import generalSlice from "./general/slice";
import loginSlice from "./login/slice";
import configureSlice from "./configure/slice";
import monitorSlice from "./monitor/slice";

export const store = configureStore({
  reducer: {
    general: generalSlice,
    login: loginSlice,
    configure: configureSlice,
    monitor: monitorSlice
  },
});

export default store;