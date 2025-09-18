import { DATA_EXPIRATION_TIME } from 'shared/constants/expiration';

export const isExpired = (date?: Date) => {
  if (!date) return true;

  const now = new Date();
  const notExpiredPeriod = new Date(now.getTime() - DATA_EXPIRATION_TIME);

  const isExpired = date < notExpiredPeriod;

  return isExpired;
};
