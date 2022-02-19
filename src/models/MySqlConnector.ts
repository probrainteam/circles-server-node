import { AbstractMysqlConnector } from './AbstractMysqlConnector';
import config from '../conf';

class MysqlConnector extends AbstractMysqlConnector {
  readonly _database: string;

  constructor() {
    super();
    this._database = config.db.database;
  }
  // @override
  public async connect(): Promise<object> {
    console.log(this._host, this._user, this._password, this._database, this._port);
    this.connection = await this.mysql.createConnection({
      host: this._host,
      user: this._user,
      password: this._password,
      database: this._database,
      port: this._port,
      multipleStatements: false,
    });
    return this.getConnection();
  }
}

export { MysqlConnector };
