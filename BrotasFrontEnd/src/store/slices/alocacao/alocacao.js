import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  alocacao: [],
};

const alocacaoSlice = createSlice({
  name: "alocacao",
  initialState,
  reducers: {
    adicionarAlocacao: (state, action) => {
      state.alocacao.push({ ...action.payload });
    },

    editarAlocacao: (state, action) => {
      let editar = state.alocacao.find((a) => a.id == action.payload.id);
      editar.pessoa = action.payload.pessoa;
      editar.bag = action.payload.bag;
      editar.entrega = action.payload.entrega;
    },

    devolverAlocacao: (state, action) => {
      let editar = state.alocacao.find((a) => a.id == action.payload.id);
      editar.devolucao = new Date().toLocaleString("pt-BR");
    },

    excluirAlocacao: (state, action) => {
      state.alocacao = state.alocacao.filter((a) => a.id !== action.payload.id);
    },
  },
});

export const {
  adicionarAlocacao,
  editarAlocacao,
  devolverAlocacao,
  excluirAlocacao,
} = alocacaoSlice.actions;
export default alocacaoSlice.reducer;
