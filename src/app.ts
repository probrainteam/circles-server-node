import express, { Request, Response, NextFunction } from 'express'
import { getDomainUri, getDBUri } from './static/configure'

const app = express();
const helmet = require('helmet'); // node js http secure 모듈

const PORT: String = '13000' // 포트
const MODE: String = process.argv[2]; // main or dev
const domain: String = `${getDomainUri(MODE)}:${PORT}`;
const db: String = getDBUri(MODE);

app.use(helmet()); // helmet의 모든 기능 사용
console.warn(`
    ---------------------------------------------
        Start Server with Condition :: ${MODE}
        Using below options ...\n
        Domain : ${domain}
        db : ${db}
    ---------------------------------------------
    `);

app.get('/', (req: Request, res: Response, next: NextFunction)=>{
    res.send('init')
});

app.listen(PORT,() =>{
    console.log(`
    ################################################
    🛡️  Server listening on port: ${PORT}🛡️
    ################################################
  `);
});