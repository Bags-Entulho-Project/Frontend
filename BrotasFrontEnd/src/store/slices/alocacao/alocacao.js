import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  alocacao: [],
};

export const alocacaoSlice = createSlice({
  name: "alocacao",
  initialState,
  reducers: {
    adicionarAlocacao: (state, action) => {
      state.alocacao.push({ ...action.payload });
    },
  },
});

export const { adicionarAlocacao } = alocacaoSlice.actions;
export default alocacaoSlice.reducer;
