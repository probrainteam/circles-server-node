import config from '../conf';
import { logger } from '../utils/logger';
import mysql from 'promise-mysql2';

let pool: mysql.Pool

async function initialize():Promise<any>{
    pool = mysql.createPool({
        host: config.db.host,
        user: config.db.id,
        database: config.db.database,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });    
    logger.info((await pool.getConnection()).statistics())
    pool.on("error", function(err: any)
    {
        logger.error("MYSQL pool Failed to Intialized ❌");        
        logger.error(err)
    });
    pool.getConnection().then(con => logger.info(con))
    logger.info("MYSQL pool Intialized ✅");
    return pool;

}

async function getPool():Promise<any>{
    if (pool) return pool;
    else return await initialize();
}
async function getConnection():Promise<any>{
    return pool.getConnection();
}

const connect = (fn: (...args:any) => Promise<any>) => async (...args:any) => {
    /* DB 커넥션을 한다. */

    const con: any = await pool.getConnection();

    /* 로직에 con과 args(넘겨받은 paramter)를 넘겨준다. */
    const result = await fn(con, ...args).catch((error: any) => {
        /* 에러시 con을 닫아준다. */
        logger.error(error)
        con.connection.release();
        throw error;
    });
    /* con을 닫아준다. */
    con.connection.release();
    return result;
};
const transaction = (fn: (...args:any) => Promise<any>) => async (...args:any) => {
    /* DB 커넥션을 한다. */
    const con: any = await pool.getConnection();
    /* 트렌젝션 시작 */
    await con.connection.beginTransaction();
    /* 비지니스 로직에 con을 넘겨준다. */
    const result = await fn(con, ...args).catch(async (error) => {
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
}
module.exports= {getPool,getConnection, connect, transaction}