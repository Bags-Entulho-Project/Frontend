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

export const pessoaSlice = createSlice({
  name: "pessoa",
  initialState,
  reducers: {
    adicionarPessoa: (state, action) => {
      state.pessoa.push({...action.payload});
    },

    editarPessoa:(state, action) =>{
      let editar = state.pessoa.find((p) => p.id == action.payload.id);
      editar.nome = action.payload.nome;
      editar.cpf = action.payload.cpf;
      editar.fone = action.payload.fone;
      editar.celular = action.payload.celular
    },

    tirarPessoa: (state, action) => {
      state.pessoa = state.pessoa.filter((p) => p.id !== action.payload.id);
    },

    getPessoa: (state, action) => {
      state.pessoa = action.payload.map((pessoa) => {
        return { ...pessoa, key: pessoa.id }
      })
    }
  },
});

export const { adicionarPessoa, editarPessoa, tirarPessoa } = pessoaSlice.actions;
export default pessoaSlice.reducer;
