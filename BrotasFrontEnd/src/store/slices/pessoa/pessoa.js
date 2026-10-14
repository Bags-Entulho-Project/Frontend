import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pessoa: [],
};

export const pessoaSlice = createSlice({
  name: "pessoa",
  initialState,
  reducers: {
    substituirPessoas: (state, action) => {
      state.pessoa = action.payload.map((pessoa) => ({
        ...pessoa,
        key: pessoa.id,
      }));
    },
  },
});

export const { substituirPessoas } =
  pessoaSlice.actions;
export default pessoaSlice.reducer;
