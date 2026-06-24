import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    email: "",
    senha: ""
}

export const testSlice = createSlice({
    name: "test",
    initialState,
    reducers: {
        escrever: (state, action) => {
            state.email = action.payload.email
            state.senha = action.payload.senha
        }
    }
})

export const {escrever} = testSlice.actions
export default testSlice.reducer