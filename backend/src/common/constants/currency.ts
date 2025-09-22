const now = new Date();
export const BASE_API_CURRENCY_RATE = {
  CURRENCY_CODE: 'BYN',
  CURRENCY_ID: -1,
  CURRENCY_DATE_START: new Date(1991, 0, 1),
  CURRENCY_DATE_END: new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1,
  ),
  CURRENCY_NAME_ENG: 'Belarusian ruble',
  CURRENCY_RATE: 1,
  CURRENCY_SCALE: 1,
};
