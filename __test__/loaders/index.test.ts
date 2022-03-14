const express = require('express');
const app = express();
const mysql = require('../../src/models/InitiateMysqlPool.ts');
import request from 'supertest';
import loaders from '../../src/loaders';
import { destroyMongo } from '../../src/utils/logger';

let client: any;
jest.setTimeout(10000);

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

beforeAll(async () => {
  await sleep(1000);
  client = await mysql.initialize();
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
describe('Mysql test', () => {
  test('Get table length', async () => {
    const [result, field] = await mysql.transaction((con: any) => con.query(`show tables`))();
    expect(result.length).toBe(9);
  });
});
afterAll(async () => {
  // THIS IS HOW YOU CLOSE CONNECTION IN MONGOOSE (mongodb ORM)
  // No more need to destroy mysql connection.
  client.end();
  destroyMongo();
});
