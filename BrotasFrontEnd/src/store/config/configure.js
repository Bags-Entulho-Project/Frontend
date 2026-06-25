import { configureStore } from "@reduxjs/toolkit";
import testSlice from "../slices/auth/test";

export const store = configureStore({
  reducer: {
    test: testSlice,
  },
});
