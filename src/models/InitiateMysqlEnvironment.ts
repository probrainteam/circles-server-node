import { AbstractMysqlConnector } from "./AbstractMysqlConnector";
import { getDbDatabase } from "../conf/conf"

class InitiateMysqlEnviroment extends AbstractMysqlConnector{
    readonly _database : string;
    constructor(){
        super();
        this._database = getDbDatabase(process.argv[2]);
        console.log(this._host)
        console.log(this._user)
        console.log(this._password)
        console.log(this._database)
    }
}

export {InitiateMysqlEnviroment}