import { ApiCurrency } from '../interfaces/api-currency.interface';
import { BASE_API_CURRENCY_RATE } from 'src/common/constants/currency';

export const API_BASE_CURRENCY: ApiCurrency = {
  Cur_Abbreviation: BASE_API_CURRENCY_RATE.CURRENCY_CODE,
  Cur_ID: BASE_API_CURRENCY_RATE.CURRENCY_ID,
  Cur_DateStart: BASE_API_CURRENCY_RATE.CURRENCY_DATE_START,
  Cur_DateEnd: BASE_API_CURRENCY_RATE.CURRENCY_DATE_END,
  Cur_Name_Eng: BASE_API_CURRENCY_RATE.CURRENCY_NAME_ENG,
};
