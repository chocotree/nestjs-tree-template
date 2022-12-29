interface MysqlConfig {
  type: 'mysql';
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

interface GgoogleLoginConfig {
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  GOOGLE_CLIENT_CALLBACK_URL: string;
}

interface AppConfig {
  APP_ENV: 'local' | 'staging' | 'develop' | 'production';
  JWT_SECRET: string;
  googleLogin: GgoogleLoginConfig;
  db: MysqlConfig;
}
