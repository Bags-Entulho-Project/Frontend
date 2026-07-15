import { configureStore } from "@reduxjs/toolkit";
import { pessoaSlice } from "../slices/pessoa/pessoa";
import { bagSlice } from "../slices/bag/bag";
import { alocacaoSlice } from "../slices/alocacao/alocacao";
import { loginSlice } from "../slices/login/login";
import { loginApi } from "../slices/login/queries";

export const store = configureStore({
  reducer: {
    pessoa: pessoaSlice,
    bag: bagSlice,
    alocacao: alocacaoSlice,
    login: loginSlice,
    [loginApi.reducerPath]: loginApi.reducer,
  },

  middleware: (getDefaultMiddleware) => {
    getDefaultMiddleware().prepend(loginApi.middleware);
  },
});
