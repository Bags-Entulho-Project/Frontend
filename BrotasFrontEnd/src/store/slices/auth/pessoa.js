import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nome: "",
  email: "",
};

export const testSlice = createSlice({
  name: "pessoa",
  initialState,
  reducers: {
    userAuthenticated: (state, action) => {
      state.nome = action.payload.nome;
      state.email = action.payload.email;
    },
  },
});

export const { userAuthenticated } = testSlice.actions;
export default testSlice.reducer;