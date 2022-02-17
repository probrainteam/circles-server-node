import dotenv from 'dotenv';

const envFound = dotenv.config();

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
if (process.env.NODE_ENV === 'development')
  if (envFound.error) {
    // This error should crash whole process

    throw new Error("⚠️  Couldn't find .env file  ⚠️");
  }
if (process.env.NODE_ENV !== 'development') {
  if (process.env.NODE_ENV !== 'production')
    throw new Error('⚠️  Wrong config  ⚠️');
}
export type configureOptions = { [key: string]: string };
export default {
  project_name: process.env.PROJECT_NAME || '',
  mode: process.env.NODE_ENV || '',
  port: process.env.MAIN_DOMAIN_PORT || '',
  db: {
    host: process.env.MAIN_DB_HOST || '',
    uri: process.env.MAIN_DB_URI || '',
    id: process.env.MAIN_DB_USER || '',
    password: process.env.MAIN_DB_PASSWORD || '',
    database: process.env.MAIN_DB_DATABASE || '',
  },
  redis:{
    host : process.env.MAIN_REDIS_HOST,
    port : process.env.MAIN_REDIS_PORT,
    name : process.env.MAIN_REDIS_NAME,
    password : process.env.MAIN_REDIS_PASSWORD,
    accessKey : process.env.MAIN_REDIS_ACCESSKEY,
    refreshKey : process.env.MAIN_REDIS_REFRESHKEY
  },
  logs: {
    dir: 'logs',
  },
};
