const client = require('../cache/InitiateRedisConn');
export default async (): Promise<any> => {
  await client.initialize();
};
