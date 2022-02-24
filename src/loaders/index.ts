const figlet = require('figlet');
import expressLoader from './express';
import mysqlLoader from './mysql';
import redisLoader from './redis';
import { logger } from '../utils/logger';

export default async ({ expressApp }: { expressApp: any }) => {
  logger.info(
    '\n' +
      figlet.textSync('Circles - server', {
        horizontalLayout: 'default',
        verticalLayout: 'default',
        whitespaceBreak: true,
      }),
  );

  logger.verbose('MYSQL in Intialize sequence ...');
  await mysqlLoader();
  logger.verbose('REDIS in Intialize sequence ...');
  await redisLoader();
  logger.verbose('Express in Intialize sequence ...');
  await expressLoader({ app: expressApp });
  logger.info('Express Intialized ✅');
};
