import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../../Api";
import { build } from "vite";

export const loginApi = createApi({
  reducerPath: "loginApi",
  baseQuery: baseQuery({
    headers: { "Content-Type": "application/json" },
  }),
  tagTypes: ['Logged'],
  endpoints: (build) =>({
    postLogin: build.mutation({
        queryFn: async (args, {dispatch}, _, fetchWithBaseQuery ) => {
            try{
                const response = (await fetchWithBaseQuery({
                    url: "auth/login",
                    method: "POST",
                    data: args,
                }))
                console.log("responmse", response);
            }
            catch (err){
                return {
            error: {
              status: "FETCH_USERS_ERROR",
              error: err,
            },
          };
            }
        },
    })
  }),
});

export const {usePostLoginMutation} = loginApi
