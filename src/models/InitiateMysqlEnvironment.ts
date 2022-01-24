const fs = require('fs');
const path = require('path');
import { AbstractMysqlConnector } from "./AbstractMysqlConnector";
import { getDbDatabase } from "../conf/conf"

class InitiateMysqlEnviroment extends AbstractMysqlConnector{
    readonly _database : string;

    constructor(){
        super();
        this._database = getDbDatabase(process.argv[2]);
    }
    public async initialize() : Promise<boolean> {
        const connection = await this.connect();
        let condition = false;
        try{
            const [rows, fields] = await connection.query("SHOW TABLES;")
            if (Object.keys(rows).length === 0){
                console.warn("> There is no tables")
                console.warn("> Create tables... ")
                const tableCreateQuery : string = fs.readFileSync(path.join(__dirname, '../conf/tableConfig.sql')).toString();
                await connection.query(tableCreateQuery);
                console.warn("> Success !")
            }
            console.log("MYSQL Intialized");
            condition = true;
        } catch(error: any){
            console.log("MYSQL Failed to Intialized");
            if(process.argv[2] === "dev")
                console.error(error);
            else{
                // @TODO :: logger file에 해당 내용 저장
            }
        } finally{
            connection.destroy();
            return condition;
        }
        
    }
    public async connect(): Promise<any> {
        this.connection = await this.mysql.createConnection({
            host : this._host,
            user : this._user,
            password: this._password,
            multipleStatements:true
        })
        try{
            const  [rows, fields] = await this.connection.query("SHOW STATUS LIKE 'Threads_connected';");
            console.log(rows[0])
            await this.connection.query(`USE ${this._database}`)
        } catch(error:any){
            console.warn(`> There is no database ${this._database}`)
            console.warn("> Create database... ")
            await this.connection.query(`CREATE DATABASE ${this._database};`)
            await this.connection.query("SHOW DATABASES;")
            console.log("> Success !")
            await this.connection.query(`USE ${this._database}`)
        } finally{
            return this.getConnection();
        }
    }
}

export {InitiateMysqlEnviroment}