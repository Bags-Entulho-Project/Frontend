import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bag: [
    {
      id: 0,
      key: 0,
      numero: "123456",
      disponivel: true,
      observacao: "esta ok",
    },
  ],
};

export const bagSlice = createSlice({
  name: "bag",
  initialState,
  reducers: {
    adicionarBag: (state, action) => {
      state.bag.push({ ...action.payload });
    },

    editarBag: (state, action) => {
      let editar = state.bag.find((b) => b.id == action.payload.id);
      editar.numero = action.payload.numero;
      editar.observacao = action.payload.observacao;
    },

    changeStatus: (state, action) => {
      var editar = state.bag.find((b) => b.id == action.payload.id);
      editar.disponivel = !editar.disponivel;
    },

    excluirBag: (state, action) => {
      state.bag = state.bag.filter((b) => b.id !== action.payload.id);
    },
  },
});

export const { adicionarBag, editarBag, changeStatus, excluirBag } = bagSlice.actions;
export default bagSlice.reducer;
