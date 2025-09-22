import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { GetCurrenciesResponse } from "../types";

export const currenciesApi = createApi({
  reducerPath: "currenciesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}/currencies`,
  }),
  endpoints: (builder) => ({
    getCurrentCurrencies: builder.query<GetCurrenciesResponse, void>({
      query: () => ({
        url: "/current",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetCurrentCurrenciesQuery } = currenciesApi;
