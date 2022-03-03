const pool = require('../models/InitiateMysqlPool');
export default async (): Promise<any> => {
  return await pool.getPool();
};
