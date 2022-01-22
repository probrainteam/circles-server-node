const mysql = require('promise-mysql2');

export default async (): Promise<any> => {
    const connection = await mysql.createConnection({
        host : 'localhost',
        user : 'root',
        password:'qwer1234',
        database:'test'
    })
    console.log("---------------------!!! -")
    //connection.connect(function(err:any) {if (err) throw err;});
    
    return connection;
  }
