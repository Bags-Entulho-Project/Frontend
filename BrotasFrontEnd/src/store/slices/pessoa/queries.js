import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../../Api";
import { build } from "vite";

export const pessoaApi = createApi({
  reducerPath: "pessoaApi",
  baseQuery: baseQuery({
    headers: { "Content-Type": "application/json" },
  }),
  tagTypes: ['pessoaGET'],
  endpoints: (build)=>({
    getPessoa:build.query({
        queryFn: async (args, __, _, fetchWithBaseQuery) =>{
                
        }
    })
  })
});
