import config from '../conf';
import { logger } from '../utils/logger';
const redis = require('redis');

let client: any;

async function initialize(): Promise<any> {
  if (!client) {
    client = redis.createClient({
      url: config.redis.url,
    });
    try {
      client.on('error', () => {});
      logger.info('REDIS Intialized ✅');
    } catch (error: any) {
      logger.error('REDIS Failed to Intialized ❌');
      throw error;
    }
  }
  return client;
}
module.exports = { initialize };
