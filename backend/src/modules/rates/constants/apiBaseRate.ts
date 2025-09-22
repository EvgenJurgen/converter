import { ApiRate } from '../interfaces/api-rate.interface';
import { BASE_API_CURRENCY_RATE } from 'src/common/constants/currency';

export const API_BASE_RATE: ApiRate = {
  Cur_ID: BASE_API_CURRENCY_RATE.CURRENCY_ID,
  Cur_OfficialRate: BASE_API_CURRENCY_RATE.CURRENCY_RATE,
  Cur_Scale: BASE_API_CURRENCY_RATE.CURRENCY_SCALE,
};
