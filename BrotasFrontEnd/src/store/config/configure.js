import { configureStore } from "@reduxjs/toolkit";
import { pessoaSlice } from "../slices/pessoa/pessoa";
import { alocacaoSlice }  from "../slices/alocacao/alocacao";
import { bagSlice } from "../slices/bag/bag";
import { loginSlice } from "../slices/auth/login";
import { authApi } from "../slices/auth/queries";

export const store = configureStore({
  reducer: {
    pessoa: pessoaSlice,
    bag: bagSlice,
    alocacao: alocacaoSlice,
    login: loginSlice,
    [authApi.reducerPath]: authApi.reducer,
  },

  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().prepend(authApi.middleware)
  
});
