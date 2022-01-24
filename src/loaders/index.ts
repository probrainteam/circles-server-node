const fs = require('fs');
const path = require('path');
const figlet = require('figlet');
import expressLoader from './express';
import mysqlLoader from './mysql';
//import testLoader from './testLoader';

export default async ({ expressApp } : {expressApp: any}) => {
    console.log(figlet.textSync('Circles - server', {
        horizontalLayout: 'default',
        verticalLayout: 'default',
        whitespaceBreak: true
    }));
    try{
        //const test = await testLoader();
    } catch(err:any){
        console.error(err)
        console.log("no test file... ignore")
    }
    console.warn("MYSQL in Intialize sequence ...")
    await mysqlLoader();

    console.warn("Express in Intialize sequence ...")
    await expressLoader({ app: expressApp });
    console.log('Express Intialized ✅');
}