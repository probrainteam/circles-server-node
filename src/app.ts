import express, { Express, Request, Response, NextFunction } from 'express'
import { getDomainUri, getDomainPort, getDBUri, getDBPort } from './conf/conf'
import generalErrorHandler from './errors/generalErrorHandler';
import routes from './routes';

const app : Express = express();
const helmet = require('helmet'); // node js http secure 모듈

const MODE: String = process.argv[2]; // main or dev
const PORT: String = getDomainPort(MODE) // 포트
const domain: String = `${getDomainUri(MODE)}:${PORT}`; // uri:port
const db: String = `${getDBUri(MODE)}:${getDBPort(MODE)}`; // uri:port

app.use(helmet()); // helmet의 모든 기능 사용

app.use(routes)
app.use(generalErrorHandler)

console.warn(`
    ---------------------------------------------
        Start Server with Condition :: ${MODE}
        Using below options ...\n
        Domain : ${domain}
        db : ${db}
    ---------------------------------------------
    `);

// import type { ErrorRequestHandler } from "express";
// export type ErrorRequestHandler = (err: any, req: Request, res: Response, next:NextFunction
// const errorHandler: ErrorRequestHandler = (err, req, res, next) => {};
// app.use(errorHandler); 다음과 같은 명세를 해도 된다.

app.use(function (err:any, req:Request, res:Response, next:NextFunction) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "production" ? err : {};
    
    // render the error page
    res.status(err.status || 500);
    res.render("error");
    });
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