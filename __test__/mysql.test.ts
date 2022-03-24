const mysql = require('../src/models/InitiateMysqlPool.ts');
import mongoose from 'mongoose';
import { logger, destroyMongo } from '../src/utils/logger';

let client: any;
jest.setTimeout(10000);

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

beforeAll(async () => {
  await sleep(1000);
  client = await mysql.initialize();
});

describe('Mysql test', () => {
  test('Mysql pool init', async () => {
    expect(mysql.initialize()).not.toBeNull();
  });

  test('Get table length', async () => {
    const [result, _] = await mysql.transaction((con: any) => con.query(`show tables`))();
    expect(result.length).toBe(9);
  });
});

afterAll(async () => {
  client.end();
  destroyMongo();
  mongoose.connection.close();
});
