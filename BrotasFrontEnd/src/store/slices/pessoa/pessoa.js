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

// const initialStateQUE_E_PRA_SER = {
//   pessoa: [
//     {
//       id: 0,
//       nome: "jose",
//       isCancel: false,
//     }
//   ]
// }

export const pessoaSlice = createSlice({
  name: "pessoa",
  initialState,
  reducers: {
    adicionarPessoa: (state, action) => {
      const payload = Array.isArray(action.payload)
        ? action.payload
        : [action.payload];

      payload.forEach((pessoa) => {
        state.pessoa.push({
          ...pessoa,
          key: pessoa.id ,
        });
      });
    },

    editarPessoa: (state, action) => {
      let editar = state.pessoa.find((p) => p.id == action.payload.id);
      editar.nome = action.payload.nome;
      editar.cpf = action.payload.cpf;
      editar.fone = action.payload.fone;
      editar.celular = action.payload.celular;
    },

    tirarPessoa: (state, action) => {
      state.pessoa = state.pessoa.filter((p) => p.id !== action.payload.id);
    },

    getPessoa: (state, action) => {
      state.pessoa = action.payload.map((pessoa) => {
        return { ...pessoa, key: pessoa.id };
      });
    },
  },
});

export const { adicionarPessoa, editarPessoa, tirarPessoa } =
  pessoaSlice.actions;
export default pessoaSlice.reducer;
