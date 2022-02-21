const mysql = require('../models/InitiateMysqlEnvironment');
export default async (): Promise<any> => {
  const client = await mysql.getConnection();
  //client.destroy();
};
