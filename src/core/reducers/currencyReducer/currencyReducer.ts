import {createSlice} from '@reduxjs/toolkit';
import {currencies} from '../../constants/availableCurrencies';
const initialState = {
  convertedCurrencies: currencies,
  exchangeRate: currencies,
  isLoading: false,
  status: '',
  message: '',
};

export const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    convertCurrency: (state, _) => {
      state.isLoading = true;
    },

    convertCurrencySuccess: (state, action) => {
      state.convertedCurrencies = action.payload;
      state.isLoading = false;
    },

    getExchangeRate: (state, _) => {
      state.isLoading = true;
    },

    getExchangeRateSuccess: (state, action) => {
      state.exchangeRate = action.payload;
      state.isLoading = false;
    },

    actionFailid: (state, action) => {
      state.message = action.payload;
      state.isLoading = false;
    },
  },
});

export const {
  convertCurrency,
  convertCurrencySuccess,
  getExchangeRate,
  getExchangeRateSuccess,
  actionFailid,
} = currencySlice.actions;

export default currencySlice.reducer;
