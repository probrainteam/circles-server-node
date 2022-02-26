import * as winston from 'winston';
import { MongoDBTransportInstance, MongoDBConnectionOptions } from 'winston-mongodb';
import DailyRotateFile from 'winston-daily-rotate-file';
const { MongoDB }: { MongoDB: MongoDBTransportInstance } = require('winston-mongodb');
const { combine, timestamp, metadata, printf } = winston.format;
import config from '../conf';

const db_uri = `mongodb://${config.logger.db.user}:${config.logger.db.password}@${config.logger.db.host}:${config.logger.db.port}/${config.logger.db.database}?authSource=${config.logger.db.auth_source}`;
const logDir = config.logger.file.root_dir;

const logFormat = printf((info) => {
  return `${info.timestamp} ${info.level}: ${info.message}`;
});

const infoTransport: DailyRotateFile = new DailyRotateFile({
  level: 'info',
  datePattern: 'YYYY-MM-DD',
  dirname: logDir,
  filename: `%DATE%.log`,
  maxFiles: 30, // 30일치 로그 파일 저장
  zippedArchive: true,
});

const errorTransport: DailyRotateFile = new DailyRotateFile({
  level: 'error',
  datePattern: 'YYYY-MM-DD',
  dirname: logDir + '/error', // error.log 파일은 /logs/error 하위에 저장
  filename: `%DATE%.error.log`,
  maxFiles: 30,
  zippedArchive: true,
});

const mongoLogTransport = new MongoDB({
  level: 'verbose',
  db: db_uri,
  options: {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  collection: config.logger.db.collection,
  format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), metadata()),
  meta: true,
  size: 5242880,
} as MongoDBConnectionOptions);

const logger = winston.createLogger({
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    logFormat,
  ),
  transports: [infoTransport, errorTransport, mongoLogTransport],
});

// Production 환경이 아닌 경우(dev 등)
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(), // 색깔 넣어서 출력
        winston.format.simple(), // `${info.level}: ${info.message} JSON.stringify({ ...rest })` 포맷으로 출력
      ),
    }),
  );
}

const destroyMongo = () => {
  mongoLogTransport.destroy();
};
export { logger, destroyMongo };
