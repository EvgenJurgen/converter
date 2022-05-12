import {call, put, takeEvery} from 'redux-saga/effects';
import {currenciesNames} from '../../constants/availableCurrencies';
import {Currency} from '../../interfaces/currencyInterface';
import {
  convertCurrency,
  convertCurrencySuccess,
  actionFailid,
  getExchangeRate,
  getExchangeRateSuccess,
} from '../../reducers/currencyReducer/currencyReducer';

const getExchangeRates = async () => {
  const response = await fetch(
    'https://currency-conversion-and-exchange-rates.p.rapidapi.com/latest?from=USD&to=EUR%2CGBP',
    {
      method: 'GET',
      headers: {
        'X-RapidAPI-Host': 'currency-conversion-and-exchange-rates.p.rapidapi.com',
        'X-RapidAPI-Key': '00867032ecmsha40501cb8611c56p1bb1f3jsna96d04862455',
      },
    },
  );

  const data = await response.json();

  const ratesOfAvailableCurrencies = currenciesNames.map(currencyName => {
    const rate = data.rates[currencyName];
    return {name: currencyName, rate};
  });

  return ratesOfAvailableCurrencies;
};

function* convertCurrencyWorker({payload}: {payload: Currency; type: string}) {
  try {
    const rates: [{name: string; rate: number}] = yield call(getExchangeRates);

    const currentCurrency = rates.find(currency => currency.name === payload.name);

    if (currentCurrency) {
      const convertedCurrencies: Currency[] = rates.map(currency => ({
        name: currency.name,
        amount: (currency.rate * payload.amount) / currentCurrency.rate,
      }));

      yield put(convertCurrencySuccess(convertedCurrencies));
    } else {
      throw new Error('An unsupported currency is selected');
    }
  } catch ({message}) {
    yield put(actionFailid(message));
  }
}

function* getExchangeRateWorker({payload}: {payload: Currency; type: string}) {
  try {
    const rates: [{name: string; rate: number}] = yield call(getExchangeRates);

    const currentCurrency = rates.find(currency => currency.name === payload.name);

    if (currentCurrency) {
      const exchangeRate: Currency[] = rates.map(currency => ({
        name: currency.name,
        amount: currency.rate / currentCurrency.rate,
      }));

      yield put(getExchangeRateSuccess(exchangeRate));
    } else {
      throw new Error('An unsupported currency is selected');
    }
  } catch ({message}) {
    yield put(actionFailid(message));
  }
}

export function* convertCurrencyWatcher() {
  yield takeEvery(convertCurrency.type, convertCurrencyWorker);
}

export function* getExchangeRateWatcher() {
  yield takeEvery(getExchangeRate.type, getExchangeRateWorker);
}
