const pool = require('../models/InitiateMysqlPool');
export default async (): Promise<any> => {
  await pool.initialize();
};
