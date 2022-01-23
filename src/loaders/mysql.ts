const mysql = require('promise-mysql2');
const DATABASE = "test"

export default async (): Promise<any> => {
    const connection = await mysql.createConnection({
        host : 'localhost',
        user : 'root',
        password:'qwer1234',
        multipleStatements:true
    })
    
    // connection.connect(function(err:any) {if (err) throw err;});
    //const  [rows, fields] = await connection.query("CREATE DATABASE IF NOT EXISTS test;")
    await connection.query(`USE ${DATABASE}`).catch(async function(error:any){
        console.warn(`> There is no database ${DATABASE}`)
        console.warn("> Create database... ")

        await connection.query(`CREATE DATABASE ${DATABASE};`)
        await connection.query("SHOW DATABASES;")
        console.log("> Success !")
        await connection.query(`USE ${DATABASE}`)
    })
    return connection;
}
