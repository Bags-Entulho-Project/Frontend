import { combineReducers, configureStore } from "@reduxjs/toolkit";
import pessoaSlice from "../slices/pessoa/pessoa";
import alocacaoSlice from "../slices/alocacao/alocacao";
import storage from "redux-persist/lib/storage";
import bagSlice from "../slices/bag/bag";
import loginSlice from "../slices/auth/login";
import { authApi } from "../slices/auth/queries";
import { catalogApi } from "../services/catalogApi";
import { persistReducer, persistStore } from "redux-persist";

const reducers = combineReducers({
  pessoa: pessoaSlice,
  bag: bagSlice,
  alocacao: alocacaoSlice,
  auth: loginSlice,
  [authApi.reducerPath]: authApi.reducer,
  [catalogApi.reducerPath]: catalogApi.reducer,
});

const rootReducer = (state, action) => {
  if (action.type === "auth/logout") {
    state = undefined;
  }

  return reducers(state, action);
};

const persistConfig = {
  key: "root",
  storage,
  whitelist:["auth"]
};

export const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({serializableCheck: false}).concat(authApi.middleware, catalogApi.middleware),
});

export const persistor = persistStore(store);
