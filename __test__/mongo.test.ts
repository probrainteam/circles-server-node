const mongoose = require('mongoose');
import conf from "../src/conf";
const user = conf.logger.db.user;
const password = conf.logger.db.password;
const authDB = conf.logger.db.auth_source;
const host = conf.logger.db.host;
const database = conf.logger.db.database;
const port= conf.logger.db.port;
const db_uri = `mongodb://${user}:${password}@${host}:${port}/${database}?authSource=${authDB}`;

describe("Mongo test", ()=>{
    test(`connect test to ${db_uri}`, async()=>{
        const connection = await mongoose.connect(db_uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        expect(connection.connect).toBeDefined();
    })
})

afterAll(()=>{
    mongoose.connection.close();
})