import expressLoader from './express';
import mysqlLoader from './mysql';

export default async ({ expressApp } : {expressApp: any}) => {
    const mysqlConnection = await mysqlLoader();
    await console.log("MYSQL Intialized");
    
    const  [rows, fields] = await mysqlConnection.query("SHOW STATUS LIKE 'Threads_connected';");
    console.log(rows[0])
   //mysqlConnection.destroy()
    await expressLoader({ app: expressApp });
    console.log('Express Intialized');
}