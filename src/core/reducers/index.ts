import {combineReducers} from '@reduxjs/toolkit';
import currencyReducer from './currencyReducer/currencyReducer';

export const rootReducer = combineReducers({
  currency: currencyReducer,
});
