import { getDbHost, getDbPassword, getDbUser } from "../conf/conf"

abstract class AbstractMysqlConnector {
    protected mysql = require('promise-mysql2');
    readonly _host: string;
    readonly _user: string;
    readonly _password: string;
    protected connection: any;
    
    constructor(){
        this._host = getDbHost(process.argv[2]);
        this._user = getDbUser(process.argv[2]);
        this._password = getDbPassword(process.argv[2]);
    }
    public async connect(): Promise<any> {
        this.connection = await this.mysql.createConnection({
            host : this._host,
            user : this._user,
            password: this._password,
            multipleStatements:true
        })
        return this.getConnection();
    }
    public getConnection(): any {
        return this.connection;
    }
}
export {AbstractMysqlConnector};