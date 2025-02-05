import { createAsyncThunk } from "@reduxjs/toolkit";

import { notification } from "src/redux/actions";
import https from "src/https/https";

export const getUsers = createAsyncThunk("getUsers", async (payload, thunkAPI) => {
    try {
      let response = await https.get(``);
      if (response && response.status === 200 && response.data) {
        if (response.data.success) {
          return response.data
        } else {
          thunkAPI.dispatch(notification());
          return response.data
        }
      }
    } catch (e) {
      console.log("Error:", e.response)
      thunkAPI.dispatch(notification());
    }
  })