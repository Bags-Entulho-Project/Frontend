import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pessoa: [
    {
      id: 0,
      key: 0,
      nome: "test",
      cpf: "123.123.123-21",
      fone: "12345678",
      celular: "12346578",
    },
  ],
};

export const testSlice = createSlice({
  name: "pessoa",
  initialState,
  reducers: {
    adicionarPessoa: (state, action) => {
      state.pessoa.push({...action.payload});
    },

    tirarPessoa: (state, action) => {
      state.pessoa = state.pessoa.filter((p) => p.id !== action.payload.id);
    },
  },
});

export const { adicionarPessoa, tirarPessoa } = testSlice.actions;
export default testSlice.reducer;
