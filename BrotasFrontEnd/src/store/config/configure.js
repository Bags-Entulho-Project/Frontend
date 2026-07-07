import { configureStore } from "@reduxjs/toolkit";
import pessoaSlice from "../slices/pessoa/pessoa";
import bagSlice from "../slices/bag/bag";
import alocacaoSlice from "../slices/alocacao/alocacao";
import loginSlice from "../slices/login/login";

export const store = configureStore({
  reducer: {
    pessoa: pessoaSlice,
    bag: bagSlice,
    alocacao: alocacaoSlice,
    login: loginSlice,
  },
});
