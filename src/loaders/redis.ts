import { InitiateRedisEnviroment } from "../cache/InitiateRedisEnvironment";

export default async (): Promise<boolean> => {
    const initiateor = new InitiateRedisEnviroment();
    
    return await initiateor.initialize();
}
