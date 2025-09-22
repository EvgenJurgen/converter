import type { RateQueryCurrency } from "../types";

const API_BASE_CURRENCY = "BYN";

export const DEFAULT_CURRENCIES: RateQueryCurrency[] = [
  "USD",
  "EUR",
  "RUB",
  API_BASE_CURRENCY,
];
