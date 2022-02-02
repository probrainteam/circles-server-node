const mysql = require('promise-mysql2');
import { InitiateMysqlEnviroment } from "../models/InitiateMysqlEnvironment";
const DATABASE = "test"

export default async (): Promise<boolean> => {
    const initiateor = new InitiateMysqlEnviroment();
    
    return await initiateor.initialize();
}
