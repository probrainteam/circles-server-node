const fs = require('fs');
const path = require('path');
import { AbstractRedisConnector } from "./AbstractRedisConnector";

class InitiateRedisEnviroment extends AbstractRedisConnector{

    constructor(){
        super();
    }
    // @override
    public async initialize() : Promise<boolean> {
        const connection = await this.connect();
        let result = false;
    
        try{ 
            connection.on('error', () =>  {});
            console.log("REDIS Intialized ✅");
            result = true;
        } catch(error: any){ 
            console.log("REDIS Failed to Intialized ❌");
            if(process.argv[2] === "dev") // 개발환경인 경우 error terminal에 출력
                console.error(error);
            else{
                // @TODO :: logger file에 해당 내용 저장
            }
        } finally{
            connection.quit();
            return result;
        }
        

    }
    // @override
    public async connect(): Promise<any> {
        this.connection = await this.redis.createClient({
            url : this._redisURL
        })
        await this.connection.connect();
        return this.getConnection();
    }
}

export {InitiateRedisEnviroment}