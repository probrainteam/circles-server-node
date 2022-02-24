const fs = require('fs');
const path = require('path');
import { AbstractMysqlConnector } from './AbstractMysqlConnector';
import config from '../conf';
import { logger } from '../utils/logger';

class InitiateMysqlEnviroment extends AbstractMysqlConnector {
  readonly _database: string;
  constructor() {
    super();
    this._database = config.db.database;
  }
  public async initialize(): Promise<any> {
    logger.verbose('make new mysql instance');
    const connection = await this.connect();

    try {
      // Table 생성 Query 날림
      const [rows, fields] = await connection.query('SHOW TABLES;');

      // Table 유무는 현재 table row개수가 0이라면 없다고 판정.
      // @TODO :: 해당 로직을 구체적으로 변경
      if (Object.keys(rows).length === 0) {
        logger.warn('> There is no tables');
        logger.warn('> Create tables... ');
        // Table 생성 query문을 '../conf/tableConfig.sql'로 부터 읽어와 execute
        const tableCreateQuery: string = fs.readFileSync(path.join(__dirname, '../conf/tableConfig.sql')).toString();
        await connection.query(tableCreateQuery);
        logger.warn('> Success !');
      }
      logger.info('MYSQL Intialized ✅');
    } catch (error: any) {
      // Error -> Table 생성 쿼리 중 오류 발생
      logger.error('MYSQL Failed to Intialized ❌');
      logger.error(error);
    } finally {
      // Query를 보내던 안보내던 connection은 destroy가 되어야함
      // destroy 되지 않으면 connection이 살아있어 db thread leak이 발생
      // mysql에서 SHOW STATUS LIKE 'Threads_connected';쿼리를 통해 현재 thread connection을
      // 볼 수 있음
      //connection.destroy();
      return connection;
    }
  }

  // @override
  public async connect(): Promise<any> {
    this.connection = await this.mysql.createConnection({
      host: this._host,
      port: this._port,
      user: this._user,
      password: this._password,
      multipleStatements: true,
      database: this._database,
    });
    try {
      await this.connection.query('use test;');
      return this.getConnection();
    } catch (error: any) {
      logger.warn(`> There is no database ${this._database}`);
      logger.warn('> Create database... ');

      logger.warn(error);
      logger.info('> Success !');
      await this.connection.query(`USE ${this._database}`);
    }
  }
  public override async getConnection(): Promise<any> {
    if (this.connection) return this.connection;
    else return await this.initialize();
  }
}

module.exports = new InitiateMysqlEnviroment();
