import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bag: [],
};

export const bagSlice = createSlice({
  name: "bag",
  initialState,
  reducers: {
    substituirBags: (state, action) => {
      state.bag = action.payload.map((bag) => ({ ...bag, key: bag.id }));
    },
  },
});

export const { substituirBags} = bagSlice.actions;
export default bagSlice.reducer;
