const client = require('../cache/InitiateRedisPool')
export default async (): Promise<any> => {
  await client.initialize();
};
