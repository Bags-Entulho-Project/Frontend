import { createApi } from "@reduxjs/toolkit/query/react";
import { create } from "axios";
import { baseQuery } from "../../../Api";
import { build } from "vite";
import { data } from "react-router-dom";

export const authApi = create({
  reducerPath: "authApi",
  baseQuery: baseQuery({
    baseURL: "http://localhost:8080/api/auth",
    headers: { "Content-Type": "application/json" },
  }),
  endpoints: (build) => ({
    login: build.mutation({
      queryFn: async (args, { dispatch }, _, fetchWithBaseQuery) => {
        const response = await fetchWithBaseQuery({
          url: "login",
          method: "POST",
          data: args,
        });
        if (response.error) {
          return {
            data: response.data,
            error: response.error,
          };
        }
        console.log(response)
        // dispatch(userAuthenticated())'
      },
    }),
  }),
});
