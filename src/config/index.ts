export const appConfig = (): AppConfig => {
  return {
    APP_ENV: process.env.APP_ENV as AppConfig['APP_ENV'],
    JWT_SECRET: process.env.JWT_SECRET,
    googleLogin: {
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
      GOOGLE_CLIENT_CALLBACK_URL: process.env.GOOGLE_CLIENT_CALLBACK_URL,
    },
    db: {
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER_NAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    },
  };
};
