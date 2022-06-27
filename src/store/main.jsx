import { configureStore } from "@reduxjs/toolkit";
import agora_slice from "./agoraSlice";
export const creds_action=agora_slice.actions;
export const store = configureStore({
  reducer:{
    credentials:agora_slice.reducer
  }
})