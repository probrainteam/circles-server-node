const redis = require('../src/cache/InitiateRedisConn');
import { destroyMongo } from '../src/utils/logger';

let client: any;
jest.setTimeout(10000);

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

beforeAll(async () => {
  await sleep(1000);
  client = await redis.initialize();
  await client.connect();
});

describe('Redis test', () => {
  test('Redis connection', async () => {
    expect(redis.initialize()).not.toBeNull();
  });

  test('Set, Get test', async () => {
    await client.set('A', '1');
    expect(await client.get('A')).toBe('1');
  });
});

afterAll(async () => {
  await client.disconnect();
  destroyMongo();
});
