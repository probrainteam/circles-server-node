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
  project_name: process.env.PROJECT_NAME!,
  mode: process.env.NODE_ENV!,
  port: process.env.DOMAIN_PORT!,
  db: {
    host: process.env.MYSQL_HOST!,
    id: process.env.MYSQL_USER!,
    password: process.env.MYSQL_PASSWORD!,
    database: process.env.MYSQL_DATABASE!,
    port: process.env.MYSQL_PORT!,
    waitForConnection: process.env.MYSQL_POOL_WAITFORCONNECTION!,
    connectionLimit: process.env.MYSQL_POOL_CONNECTIONLIMIT!,
    queueLimit: process.env.MYSQL_POOL_QUEUELIMIT!,
    multipleStmt: process.env.MYSQL_MULTIPLE_STATEMENT!,
  },
  redis: {
    url:
      `redis://${process.env.REDIS_NAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}` ||
      '',
    port: process.env.REDIS_PORT!,
    name: process.env.REDIS_NAME!,
    password: process.env.REDIS_PASSWORD!,
    accessKey: process.env.REDIS_ACCESSKEY!,
    refreshKey: process.env.REDIS_REFRESHKEY!,
  },
  logger: {
    db: {
      host: process.env.MONGO_HOST!,
      port: process.env.MONGO_PORT!,
      user: process.env.MONGO_USER_NAME!,
      password: process.env.MONGO_USER_PASSWORD!,
      database: process.env.MONGO_INITDB_DATABASE!,
      auth_source: process.env.MONGO_INITDB_ROOT_USERNAME!,
      collection: process.env.MONGO_COLLECTION!,
    },
    file: {
      root_dir: process.env.LOG_DIR!,
    },
  },
};
