const fs = require('fs');
const path = require('path');
const figlet = require('figlet');
import expressLoader from './express';
import mysqlLoader from './mysql';

export default async ({ expressApp } : {expressApp: any}) => {
    console.log(figlet.textSync('Circles - server', {
        horizontalLayout: 'default',
        verticalLayout: 'default',
        whitespaceBreak: true
    }));
    console.warn("MYSQL in Intialize sequence ...")
    const mysqlConnection = await mysqlLoader();
    await mysqlConnection.query("SHOW TABLES").then(async function([row, fields] : object[]){
        if (Object.keys(row).length === 0){
            console.warn("> There is no tables")
            console.warn("> Create tables... ")
            const tableCreateQuery : string = fs.readFileSync(path.join(__dirname, '../conf/tableConfig.sql')).toString();
            await mysqlConnection.query(tableCreateQuery);
            console.warn("> Success !")
        }
        console.log("MYSQL Intialized");
    });
    
   //mysqlConnection.destroy()
    console.warn("Express in Intialize sequence ...")
    await expressLoader({ app: expressApp });
    console.log('Express Intialized');
}