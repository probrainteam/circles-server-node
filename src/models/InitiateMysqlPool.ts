import config from '../conf';
import { logger } from '../utils/logger';
import mysql from 'promise-mysql2';
const fs = require('fs');
const path = require('path');

let pool: mysql.Pool;

async function initialize(): Promise<any> {
  if (!pool) {
    pool = mysql.createPool({
      host: config.db.host,
      user: config.db.id,
      password: config.db.password,
      database: config.db.database,
      waitForConnections: config.db.waitForConnection, // 풀에 여유 커넥션이 없는 경우 대기
      connectionLimit: config.db.connectionLimit, // 최대 10개
      queueLimit: config.db.queueLimit, // pool에 대기 요청 최대 개수, 0 -> 제한 없음
      multipleStatements: config.db.multipleStmt, // 보안 유의
    });

    try {
      // Table 생성 Query 날림
      const connection = await pool.getConnection();
      const [rows, _] = await connection.query('SHOW TABLES;');

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
      throw error;
    }
  }
}

const transaction =
  (fn: any) =>
  async (...args: any) => {
    /* DB 커넥션을 한다. */
    const con: any = await pool.getConnection();
    /* 트렌젝션 시작 */
    await con.connection.beginTransaction();
    /* 비지니스 로직에 con을 넘겨준다. */
    const result = await fn(con, ...args).catch(async (error: any) => {
      /* rollback을 진행한다. */
      await con.rollback();
      /* 에러시 con을 닫아준다. */
      con.connection.release();
      throw error;
    });
    /* commit을 해준다. */
    await con.commit();
    /* con을 닫아준다. */
    con.connection.release();
    return result;
  };

module.exports = { initialize, transaction };
