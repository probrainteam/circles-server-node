import morgan, { StreamOptions } from 'morgan';

import { logger } from '../utils/logger';

// console.log => winston dump
const stream: StreamOptions = {
  write: (message: string) => logger.info(message),
};

// development가 아니라면 false
// morgan stream을 winston으로 dump했기에
// 우선순위 winston-logger > morgan skip
const skip = (): boolean => {
  return process.env.NODE_ENV !== 'development';
};

const morganMiddleware = morgan(
  'HTTP/:http-version :method :remote-addr :url :remote-user :status :res[content-length] :referrer :user-agent :response-time ms',
  { stream, skip },
);

export default morganMiddleware;
