const figlet = require('figlet');
import expressLoader from './express';
import mysqlLoader from './mysql';
import redisLoader from './redis';

export default async ({ expressApp }: { expressApp: any }) => {
  console.log(
    figlet.textSync('Circles - server', {
      horizontalLayout: 'default',
      verticalLayout: 'default',
      whitespaceBreak: true,
    }),
  );

  console.warn('MYSQL in Intialize sequence ...');
  await mysqlLoader();
  console.warn('REDIS in Intialize sequence ...');
  await redisLoader();
  console.warn('Express in Intialize sequence ...');
  await expressLoader({ app: expressApp });
  console.log('Express Intialized ✅');
  return 'hi';
};
