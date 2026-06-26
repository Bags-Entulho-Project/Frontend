import { configureStore } from "@reduxjs/toolkit";
import pessoaSlice from "../slices/auth/pessoa";

export const store = configureStore({
  reducer: {
    pessoa: pessoaSlice,
  },
});
