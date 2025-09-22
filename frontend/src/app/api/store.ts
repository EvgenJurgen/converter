import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { currenciesApi } from "@/entities/currencies";
import { ratesApi } from "@/entities/rates";

export const store = configureStore({
  reducer: {
    [currenciesApi.reducerPath]: currenciesApi.reducer,
    [ratesApi.reducerPath]: ratesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      currenciesApi.middleware,
      ratesApi.middleware
    ),
});

setupListeners(store.dispatch);
