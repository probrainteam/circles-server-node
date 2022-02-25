const express = require('express');
const app = express();
const mysql = require("../../src/models/InitiateMysqlEnvironment");

import request from "supertest"
import loaders from "../../src/loaders"
import {destroyMongo} from "../../src/utils/logger"
beforeAll(async()=>{
    await loaders({ expressApp: app });
})
describe("Routing test", ()=>{
    test("Get example/test", async ()=>{

        const response = await request(app).get("/example/test")
        expect(response.statusCode).toBe(200)
    })

    test("Get test/example", async ()=>{
     
        const response = await request(app).get("/test/example")
        expect(response.statusCode).toBe(404)
    })
})
afterAll(async () => {
    // THIS IS HOW YOU CLOSE CONNECTION IN MONGOOSE (mongodb ORM)
    const client = await mysql.getConnection();
    client.destroy();
    destroyMongo();
});
    
    