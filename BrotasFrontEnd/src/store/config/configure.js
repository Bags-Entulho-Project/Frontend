import { configureStore } from "@reduxjs/toolkit";
import pessoaSlice from "../slices/pessoa/pessoa";

export const store = configureStore({
  reducer: {
    pessoa: pessoaSlice,
  },
});
