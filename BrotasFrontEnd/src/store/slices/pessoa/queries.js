import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../../Api";
import { adicionarPessoa } from "./pessoa";

export const pessoaApi = createApi({
  reducerPath: "pessoaApi",
  baseQuery: baseQuery({
    headers: { "Content-Type": "application/json" },
  }),
  tagTypes: ["pessoa"],
  endpoints: (build) => ({
    getPessoa: build.query({
      queryFn: async (args, {dispatch}, _, fetchWithBaseQuery) => {
        try {
          const response = await fetchWithBaseQuery({
            url: "v1/pessoa",
            method: "GET",
            data: args,
          });
          const pessoas = response.data.map((pessoa) => {return{id: pessoa.id, nome: pessoa.nome, isCancel: pessoa.isCancel}})

          dispatch(adicionarPessoa(pessoas))

          return response.data;
        } catch (err) {
          return {
            error: {
              status: "FETCH_PESSOA_ERROR",
              error: err,
            },
          };
        }
      },
      providesTags: (result) => {
        return result
          ? [
              ...result.map(({ id }) => ({ type: "pessoa", id })),
              { type: "pessoa", id: "LIST" },
            ]
          : [{ type: "pessoa", id: "LIST" }];
      },
    }),

    postPessoa: build.mutation({
      queryFn: async(args, __, _, fetchWithBaseQuery) => {
        try{
          const response = (await fetchWithBaseQuery({
            url: "v1/pessoa",
            method: "POST",
            data: args,
          }))
          return response.data;
        }
        catch(err){
          return{
            error: {
              status: "POST_PESSOA_ERROR",
              error: err,
            },
          }
        }
      }
    })
  }),
});

export const { useLazyGetPessoaQuery, usePostPessoaMutation } = pessoaApi;
