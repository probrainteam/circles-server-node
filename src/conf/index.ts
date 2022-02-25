import dotenv from 'dotenv';

const envFound = dotenv.config();

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
if (process.env.NODE_ENV === 'development')
  if (envFound.error) {
    // This error should crash whole process

    throw new Error("⚠️  Couldn't find .env file  ⚠️");
  }
if (process.env.NODE_ENV !== 'development') {
  if (process.env.NODE_ENV !== 'production') throw new Error('⚠️  Wrong config  ⚠️');
}
export type configureOptions = { [key: string]: string };
export default {
  project_name: process.env.PROJECT_NAME || '',
  mode: process.env.NODE_ENV || '',
  port: process.env.DOMAIN_PORT || '',
  db: {
    host: process.env.DB_HOST || '',
    uri: process.env.DB_URI || '',
    id: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || '',
    port: process.env.DB_PORT || '',
  },
  redis: {
    url:
      `redis://${process.env.REDIS_NAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}` ||
      '',
    port: process.env.REDIS_PORT || '',
    name: process.env.REDIS_NAME || '',
    password: process.env.REDIS_PASSWORD || '',
    accessKey: process.env.REDIS_ACCESSKEY || '',
    refreshKey: process.env.REDIS_REFRESHKEY || '',
  },
  logger: {
    db: {
      host: process.env.LOGGER_DB_HOST || '',
      port: process.env.LOGGER_DB_PORT || '',
      user: process.env.LOGGER_DB_INITDB_USER_NAME || '',
      password: process.env.LOGGER_DB_INITDB_USER_PASSWORD || '',
      database: process.env.LOGGER_DB_INITDB_DATABASE || '',
      auth_source: process.env.LOGGER_DB_INITDB_ROOT_USERNAME || '',
      collection: process.env.LOGGER_DB_COLLECTION || '',
    },
    file: {
      root_dir: 'logs',
    },
  },
};
