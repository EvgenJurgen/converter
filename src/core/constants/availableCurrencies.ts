import { Currency } from '../interfaces/currencyInterface';

/**
 * The name of the currency must comply with the ISO 4217 standard
 */

export const currenciesNames = ['USD', 'EUR', 'RUB', 'BYN'];

export const currencies: Currency[] = currenciesNames.map((name) => ({
  name,
  amount: 0
}));
