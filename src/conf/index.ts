const dotenv = require('dotenv');

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
  port: process.env.PORT || '',
  db: {
    host: process.env.DB_HOST || '',
    uri: process.env.DB_URI || '',
    id: process.env.DB_ID || '',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || '',
  },
  logs: {
    dir: 'logs',
  },
};
