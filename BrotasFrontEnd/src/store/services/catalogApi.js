import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../Api";
import { substituirPessoas } from "../slices/pessoa/pessoa";
import { substituirBags } from "../slices/bag/bag";

const listTags = (type, result) =>
  result
    ? [...result.map(({ id }) => ({ type, id })), { type, id: "LIST" }]
    : [{ type, id: "LIST" }];

export const catalogApi = createApi({
  reducerPath: "catalogApi",
  baseQuery: baseQuery(),
  tagTypes: ["Pessoa", "Bag", "Alocacao"],
  keepUnusedDataFor: 300,
  endpoints: (build) => ({
    getPessoas: build.query({
      query: () => ({ url: "v1/pessoa", method: "GET" }),
      providesTags: (result) => listTags("Pessoa", result),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(substituirPessoas(data));
        } catch {
          // O estado local anterior é mantido até uma nova consulta bem-sucedida.
        }
      },
    }),
    criarPessoa: build.mutation({
      query: (data) => ({ url: "v1/pessoa", method: "POST", data }),
      invalidatesTags: [{ type: "Pessoa", id: "LIST" }],
    }),
    atualizarPessoa: build.mutation({
      query: (data) => ({ url: "v1/pessoa", method: "PATCH", data }),
      invalidatesTags: (_, __, { id }) => [
        { type: "Pessoa", id },
        { type: "Pessoa", id: "LIST" },
      ],
    }),
    alterarStatusPessoa: build.mutation({
      query: (id) => ({ url: `v1/pessoa/change-status/${id}`, method: "PATCH" }),
      invalidatesTags: (_, __, id) => [
        { type: "Pessoa", id },
        { type: "Pessoa", id: "LIST" },
      ],
    }),

    getBags: build.query({
      query: () => ({ url: "v1/bag", method: "GET" }),
      providesTags: (result) => listTags("Bag", result),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(substituirBags(data));
        } catch {
          // O estado local anterior é mantido até uma nova consulta bem-sucedida.
        }
      },
    }),
    criarBag: build.mutation({
      query: (data) => ({ url: "v1/bag", method: "POST", data }),
      invalidatesTags: [{ type: "Bag", id: "LIST" }],
    }),
    atualizarBag: build.mutation({
      query: (data) => ({ url: "v1/bag", method: "PATCH", data }),
      invalidatesTags: (_, __, { id }) => [
        { type: "Bag", id },
        { type: "Bag", id: "LIST" },
      ],
    }),
    alterarStatusBag: build.mutation({
      query: (id) => ({ url: `v1/bag/change-status/${id}`, method: "PATCH" }),
      invalidatesTags: (_, __, id) => [
        { type: "Bag", id },
        { type: "Bag", id: "LIST" },
      ],
    }),

    getAlocacoes: build.query({
      query: () => ({ url: "v1/alocacao", method: "GET" }),
      providesTags: (result) => listTags("Alocacao", result),
    }),
    criarAlocacao: build.mutation({
      query: (data) => ({ url: "v1/alocacao", method: "POST", data }),
      invalidatesTags: [
        { type: "Alocacao", id: "LIST" },
        { type: "Pessoa", id: "LIST" },
        { type: "Bag", id: "LIST" },
      ],
    }),
    atualizarAlocacao: build.mutation({
      query: ({ id, ...data }) => ({ url: `v1/alocacao/${id}`, method: "PATCH", data }),
      invalidatesTags: [
        { type: "Alocacao", id: "LIST" },
        { type: "Pessoa", id: "LIST" },
        { type: "Bag", id: "LIST" },
      ],
    }),
    devolverAlocacao: build.mutation({
      query:({id}) => ({url: `v1/alocacao/devolver/${id}`, method: "PATCH"}),
      invalidatesTags: [
        { type: "Alocacao", id: "LIST" },
        { type: "Pessoa", id: "LIST" },
        { type: "Bag", id: "LIST" },
      ],
    }),
    alterarStatusAlocacao: build.mutation({
      query: (id) => ({ url: `v1/alocacao/change-status/${id}`, method: "PATCH" }),
      invalidatesTags: [
        { type: "Alocacao", id: "LIST" },
        { type: "Pessoa", id: "LIST" },
        { type: "Bag", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetPessoasQuery,
  useCriarPessoaMutation,
  useAtualizarPessoaMutation,
  useAlterarStatusPessoaMutation,
  useGetBagsQuery,
  useCriarBagMutation,
  useAtualizarBagMutation,
  useAlterarStatusBagMutation,
  useGetAlocacoesQuery,
  useCriarAlocacaoMutation,
  useAtualizarAlocacaoMutation,
  useDevolverAlocacaoMutation,
  useAlterarStatusAlocacaoMutation,
} = catalogApi;
