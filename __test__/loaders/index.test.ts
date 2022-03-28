const express = require('express');
const app = express();
const mysql = require('../../src/models/InitiateMysqlPool.ts');
import request from 'supertest';
import loaders from '../../src/loaders';
import { destroyMongo } from '../../src/utils/logger';

jest.setTimeout(10000);

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

beforeAll(async () => {
  await sleep(1000);
  await loaders({ expressApp: app });
});
describe('Routing test', () => {
  test('Get example/test', async () => {
    const response = await request(app).get('/example/test');
    expect(response.statusCode).toBe(200);
  });

  test('Get test/example', async () => {
    const response = await request(app).get('/test/example');
    expect(response.statusCode).toBe(404);
  });
});
afterAll(async () => {
  // THIS IS HOW YOU CLOSE CONNECTION IN MONGOOSE (mongodb ORM)
  // No more need to destroy mysql connection.
  (await mysql.initialize()).end();
  destroyMongo();
});
