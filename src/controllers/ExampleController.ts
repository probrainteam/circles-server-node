import { NextFunction, Request, Response } from 'express';
import { logger } from '../utils/logger';

const pool = require('../models/InitiateMysqlPool');

const exampleControll = async (req: Request, res: Response) => {
  const test = await pool.connect(async (con: any) => {
    const result = await con.query(`show tables`, []);
    // ...비지니스로직...
    return result;
  })();
  res.status(200).send(JSON.stringify(test));
};
const exampleTransaction = async (req: Request, res: Response) => {
  await pool.transaction((con: any) => con.query(`insert into manager values("myEmail","myPW",0,"myPubkey",0)`))();
  res.status(200).send();
};
export default { exampleControll, exampleTransaction };
