import { all } from 'redux-saga/effects';
import { convertCurrencyWatcher, getExchangeRateWatcher } from './currencySaga';

export function* currencyWatcher() {
  yield all([convertCurrencyWatcher(), getExchangeRateWatcher()]);
}
