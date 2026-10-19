import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nome: "",
  email: "",
  isAdmin: false,
  isAuthenticated: null,
};

export const loginSlice = createSlice({
  name: "userLogged",
  initialState,
  reducers: {
    loginFill: (state, action) => {
      state.nome = action.payload.nome;
      state.email = action.payload.email;
      state.isAdmin = action.payload.isAdmin;
      state.isAuthenticated = true;
    },
    changeIsAuthenticate: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    logout: (state) => {
      state.nome = initialState.nome;
      state.email = initialState.email;
      state.isAdmin = initialState.isAdmin;
      state.isAuthenticated = initialState.isAuthenticated;
    },
  },
});

export const { loginFill, changeIsAuthenticate, logout } =
  loginSlice.actions;
export default loginSlice.reducer;
