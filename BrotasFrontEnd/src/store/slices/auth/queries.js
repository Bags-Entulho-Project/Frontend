import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../../Api";
import { loginFill } from "./login";

export const authApi = createApi({
  reducerPath: "authApi",
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
                dispatch(loginFill(response.data));
                return response.data;
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

export const {usePostLoginMutation} = authApi
