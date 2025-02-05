import { createSlice } from "@reduxjs/toolkit";

import {
  login,
  forgotPassword,
  resetNewPassword,
} from "./actions"

const initialState = {
  loadedFirstTime:false,
  loadingLoginButton: false,
  loadingForgotPassword: false,
  userLogged: false,
  modalLoading: false
};

const loginSlice = createSlice({
  name: "login",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action)=>{
      state.loadingLoginButton = false;
      state.userLogged = false;
    })
    builder.addCase(login.rejected, (state, action) => {
      state.loadingLoginButton = false;
      state.userLogged = false;
    })
    builder.addCase(login.pending, (state, action) => {
      state.loadingLoginButton = true;
    })
    builder.addCase(forgotPassword.fulfilled, (state) => {
      state.modalLoading = false
    })
    builder.addCase(forgotPassword.rejected, (state) => {
      state.modalLoading = false
    })
    builder.addCase(forgotPassword.pending, (state) => {
      state.modalLoading = true
    })
    builder.addCase(resetNewPassword.fulfilled, (state) => {
      state.modalLoading = false
    })
    builder.addCase(resetNewPassword.rejected, (state) => {
      state.modalLoading = false
    })
    builder.addCase(resetNewPassword.pending, (state) => {
      state.modalLoading = true
    })
  }
});

export default loginSlice.reducer;