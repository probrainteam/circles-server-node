const mongoose = require('mongoose');

const user = "logger";
const password = "qwer1234";
const authDB = "admin";
const host = "localhost";
const database = "logs"
const port= "27019";
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