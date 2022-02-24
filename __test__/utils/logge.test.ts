const mongoose = require('mongoose');
const appRoot = require('app-root-path');
const fs = require('fs');
import { logger, destroyMongo } from "../../src/utils/logger"
import config from "../../src/conf"

const db_uri = `mongodb://${config.logger.db.user}:${config.logger.db.password}@${config.logger.db.host}:${config.logger.db.port}/${config.logger.db.database}?authSource=${config.logger.db.auth_source}`;
jest.setTimeout(10000)
function sleep(ms:number) {
    return new Promise((r) => setTimeout(r, ms));
}
beforeAll(async ()=>{
    await mongoose.connect(db_uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log(`mongo uri :: ${db_uri}`)
      console.log(config.logger.db.collection)
})
describe("Winston info level", ()=>{
    let random_number:string = Math.random().toString();
    logger.info(random_number)
    test(`random number :: ${random_number}`, async()=>{
        await sleep(50);
        await mongoose.connection.collection(config.logger.db.collection)
        .find({
            message:random_number,
            timestamp: {
                $lt: new Date(),
                $gte: new Date(Date.now() - 5000),
            }
        }).toArray().then((docs:any) => {
            expect(docs.length).toBe(1);
            expect(docs[0].level).toBe("info")
            expect(docs[0].meta).toHaveProperty("timestamp")
        });
    })
})

describe("Winston verbose level", ()=>{
    let random_number:string = Math.random().toString();
    logger.verbose(random_number)
    test(`random number :: ${random_number}`, async()=>{
        await sleep(50)
        await mongoose.connection.collection(config.logger.db.collection)
        .find({
            message:random_number,
            timestamp: {
                $lt: new Date(),
                $gte: new Date(Date.now() - 5000),
            }
        }).toArray().then((docs:any) => {
            expect(docs.length).toBe(1);
            expect(docs[0].level).toBe("verbose")
            expect(docs[0].meta).toHaveProperty("timestamp")
        });
    })
})

describe("Winston error level", ()=>{
    let random_number:string = Math.random().toString();
    logger.error(random_number)
    test(`random number :: ${random_number}`, async()=>{
        await sleep(50)
        await mongoose.connection.collection(config.logger.db.collection)
        .find({
            message:random_number,
            timestamp: {
                $lt: new Date(),
                $gte: new Date(Date.now() - 5000),
            }
        }).toArray().then((docs:any) => {
            expect(docs.length).toBe(1);
            expect(docs[0].level).toBe("error")
            expect(docs[0].meta).toHaveProperty("timestamp")
        });
    })
    logger.error("error_test", {error_code: 18})
    test(`error code :: 18`, async()=>{
        await sleep(50)
        await mongoose.connection.collection(config.logger.db.collection)
        .find({
            message:"error_test",
            timestamp: {
                $lt: new Date(),
                $gte: new Date(Date.now() - 5000),
            }
        }).toArray().then((docs:any) => {
            expect(docs[0].meta).toHaveProperty("error_code")
            expect(docs[0].meta.error_code).toBe(18)
        });
    })
})

describe("Winston warn level", ()=>{
    let random_number:string = Math.random().toString();
    logger.warn(random_number)
    test(`random number :: ${random_number}`, async()=>{
        await sleep(50)
        await mongoose.connection.collection(config.logger.db.collection)
        .find({
            message:random_number,
            timestamp: {
                $lt: new Date(),
                $gte: new Date(Date.now() - 5000),
            }
        }).toArray().then((docs:any) => {
            expect(docs.length).toBe(1);
            expect(docs[0].level).toBe("warn")
            expect(docs[0].meta).toHaveProperty("timestamp")
        });
    })
})



afterAll(()=>{
    destroyMongo();
    mongoose.connection.close();
})
    