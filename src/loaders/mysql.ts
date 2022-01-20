const mysql = require('mysql');

export default async (): Promise<any> => {
    const connection = await mysql.createConnection({
        host : 'localhost',
        user : 'root',
        password:'qwer1234',
        database : 'test'
    })
    
    //connect(process.env.DATABASE_URL, { useNewUrlParser: true });
    //return connection.connection.db;
    return connection.connect();
  }
