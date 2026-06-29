import { configureStore } from "@reduxjs/toolkit";
import pessoaSlice from "../slices/pessoa/pessoa";
import bagSlice from "../slices/bag/bag";

export const store = configureStore({
  reducer: {
    pessoa: pessoaSlice,
    bag: bagSlice,
  },
});
