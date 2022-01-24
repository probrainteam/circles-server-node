import express, { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import gravatar from "gravatar";
//import example from "../models/model1"
import { check, validationResult } from "express-validator";
//import model1 from "../models/model1";

import { nextTick } from "process";
const exampleControll = async (req: Request, res: Response, next: NextFunction) => {
    //const returnData :object = await model1.basicQuery("SHOW STATUS LIKE 'Threads_connected';")
    //console.log(returnData)
    res.send("example")
};
export default {exampleControll};