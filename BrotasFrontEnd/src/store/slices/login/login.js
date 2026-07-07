import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    // nome = "",
    // email = "",
    // isAdmin = false,
    email: "",
    senha: "",
};

export const loginSlice = createSlice({
    name: "userLogged",
    initialState,
    reducers: {
        loginFill: (state, action) => {
            // state.nome = action.payload.nome;
            state.email = action.payload.email;
            // state.isAdmin = action.payload.isAdmin;
            state.senha = action.payload.senha
        }
    }
});

export const { loginFill } = loginSlice.actions;
export default loginSlice.reducer;