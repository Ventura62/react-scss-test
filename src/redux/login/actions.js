import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  signIn,
  signOut,
  resetPassword,
  confirmResetPassword,
} from 'aws-amplify/auth';

import { addNotification } from "../general/slice";

export const login = createAsyncThunk("login", async (payload, thunkAPI) => {
  try {
    const user = await signIn({
        username: payload.username,
        password: payload.password
      });
      if (user.nextStep && user.nextStep.signInStep && user.nextStep.signInStep === "DONE"){
        return true;
      }
  } catch (e) {
    console.log("Error:", e);
    const errorMessage = e.message || "An unknown error occurred";
    thunkAPI.dispatch(addNotification({type:`danger`, message:errorMessage, title: `Oops!`}));
  }
})

export const logout = createAsyncThunk("logout", async (payload, thunkAPI) => {
  try {
    const user = await signOut();
    return user;
  } catch (e) {
    console.log("Error:", e);
    const errorMessage = e.message || "An unknown error occurred";
    thunkAPI.dispatch(addNotification({type:`danger`, message:errorMessage, title: `Oops!`}));
  }
})

export const forgotPassword = createAsyncThunk(
  'forgot-password',
  async (payload, thunkAPI) => {
    try {
      const resetPasswordResult = await resetPassword({
        username: payload
      });
      if(resetPasswordResult.nextStep.resetPasswordStep === "CONFIRM_RESET_PASSWORD_WITH_CODE"){
        thunkAPI.dispatch(addNotification({ type: `success`, message: `Confirmation code sent successfully`, title: `` }));
        resetNewPassword.username = payload
        return resetPasswordResult;
      }else{
        thunkAPI.dispatch(addNotification({ type: `warning`, message: `Confirmation code not sent correctly. Try again`, title: `` }));
      }
    } catch (e) {
      console.error("Error:", e);
      const errorMessage = e.message || "An unknown error occurred";
      thunkAPI.dispatch(addNotification({ type: `danger`, message: errorMessage, title: `Oops!` }));
    }
  }
);

export const resetNewPassword = createAsyncThunk(
  'create-new-password',
  async (payload, thunkAPI) => {
    try {
      await confirmResetPassword({
        username: payload.username,
        confirmationCode: payload.code,
        newPassword: payload.password
      });
      thunkAPI.dispatch(addNotification({ type: `success`, message: `Password updated correctly`, title: `` }));
      return true;
    } catch (e) {
      console.error("Error:", e);
      const errorMessage = e.message || "An unknown error occurred";
      thunkAPI.dispatch(addNotification({ type: `danger`, message:errorMessage, title: `Oops!` }));
    }
  }
);