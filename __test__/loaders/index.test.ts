const express = require('express');
const app = express();
import { exit } from "process";
import request from "supertest"
import loaders from "../../src/loaders"
import expressLoader from "../../src/loaders/express"
import mysqlLoader from "../../src/loaders/redis"
import redisLoader from "../../src/loaders/express"

describe("Routing test", ()=>{
    test("Get example/test", async ()=>{
        await loaders({ expressApp: app });
        const response = await request(app).get("/example/test")
        expect(response.statusCode).toBe(200)
    })

    test("Get test/example", async ()=>{
        await loaders({ expressApp: app });
        const response = await request(app).get("/test/example")
        expect(response.statusCode).toBe(404)
    })
})
afterAll(done => {
    // THIS IS HOW YOU CLOSE CONNECTION IN MONGOOSE (mongodb ORM)
    done();
});
    
    