import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  ConvertCurrencyQuery,
  ConvertCurrencyResponse,
  GetLatestRatesQuery,
  GetLatestRatesResponce,
} from "../types";

export const ratesApi = createApi({
  reducerPath: "ratesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}/rates`,
  }),
  keepUnusedDataFor: 60,
  endpoints: (builder) => ({
    convertCurrency: builder.query<
      ConvertCurrencyResponse,
      ConvertCurrencyQuery
    >({
      query: ({ from, to, amount }) => ({
        url: `/convert?from=${from}&to=${to.join(",")}&amount=${amount}`,
        method: "GET",
      }),
    }),
    getLatestRates: builder.query<GetLatestRatesResponce, GetLatestRatesQuery>({
      query: (base) => ({
        url: `/latest${base ? `?base=${base}` : ""}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useLazyConvertCurrencyQuery, useGetLatestRatesQuery } = ratesApi;
