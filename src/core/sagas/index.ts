import { all } from 'redux-saga/effects';
import { currencyWatcher } from './currencySaga';

export function* rootWatcher() {
  yield all([currencyWatcher()]);
}
