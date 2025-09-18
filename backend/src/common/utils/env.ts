export const getEnvFilePath = () =>
  process.env.NODE_ENV === 'development' ? '.env.development' : '.env';
