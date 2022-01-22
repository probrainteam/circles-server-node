import express, { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import gravatar from "gravatar";
import example from "../models/model1"
import { check, validationResult } from "express-validator";
import mysqlLoader from '../loaders/mysql'

import { nextTick } from "process";
const exampleControll = async (req: Request, res: Response, next: NextFunction) => {
    /*check("name", "Name is required").not().isEmpty();
    check("email", "Please include a valid email").isEmail();
    check("password", "Please enter a password with 6 or more characters").isLength({ min: 6 });
    const { name, email, password } : IUserInputDTO = req.body;
    try{
        const errors = validationResult(req.body);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }

        const foundUser = await UserService.findEmail({ email });
        if(foundUser)   errorGenerator({ statusCode: 409 });  // 이미 가입한 유저

        const avatar = gravatar.url(email, {
            s: "200",
            r: "pq",
            d: "mm",
        });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const createdUser = await UserService.createUser({ name, email, password: hashedPassword, avatar: avatar });

        const payload = {
            user: {
                email: createdUser.email,
            },
        };
        jwt.sign(
            payload,
            config.jwtSecret,
            { expiresIn: 36000 },
            (err, token) => {
                if(err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        next(err);
    }*/
    const mysqlConnection = await mysqlLoader();
    const  [rows, fields] = await mysqlConnection.query("SHOW STATUS LIKE 'Threads_connected';");
    console.log(rows[0])
    mysqlConnection.destroy();
    res.send("example")
};
export default {exampleControll};