export type RateQueryCurrency = string;

export interface ConvertCurrencyQuery {
  from: RateQueryCurrency;
  to: RateQueryCurrency[];
  amount: string;
}

export interface ConvertCurrencyResponse {
  [key: RateQueryCurrency]: number;
}

export type GetLatestRatesQuery = RateQueryCurrency | void;

export type GetLatestRatesResponce = {
  rate: number;
  scale: number;
  currencyCode: string;
  currencyName: string;
}[];
