import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../../Api";

export const pessoaApi = createApi({
  reducerPath: "pessoaApi",
  baseQuery: baseQuery({
    headers: { "Content-Type": "application/json" },
  }),
  tagTypes: ['pessoaGET'],
  endpoints: (build)=>({
    getPessoa:build.query({
        queryFn: async (args, __, _, fetchWithBaseQuery) =>{
            const response = (await fetchWithBaseQuery({
                url: "pessoa",
                method: "GET",
                data: args,
            }));

            
        }
    })
  })
});

export const {useLazyGetPessoaQuery} = pessoaApi