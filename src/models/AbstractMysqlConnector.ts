import config from '../conf'

abstract class AbstractMysqlConnector {
    readonly _host: string;
    readonly _user: string;
    readonly _password: string;
    readonly _port: string;
    protected connection: any;
    protected mysql = require('promise-mysql2');
  
    constructor() {
      // @TODO .env 기반으로 변경
      this._host = config.db.host;
      this._user = config.db.id;
      this._password = config.db.password;
      this._port = config.db.port;
    }
    public abstract connect(): Promise<any>;
  
    public getConnection(): any {
      return this.connection;
    }
  }
  export { AbstractMysqlConnector };