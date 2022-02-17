// Static variables
import * as configure from "./configure.json";
const DEV_DB_URI: string = configure.develop.database.uri;
const DEV_DB_PORT: string = configure.develop.database.port;
const DEV_DB_HOST: string = configure.develop.database.host;
const DEV_DB_PASSWORD: string = configure.develop.database.password;
const DEV_DB_DATABASE: string = configure.develop.database.database;
const DEV_DB_USER: string = configure.develop.database.user;
const DEV_URI: string = configure.develop.uri;
const DEV_PORT: string = configure.develop.port;

const DEV_REDIS_HOST: string = configure.develop.redis.host;
const DEV_REDIS_PORT: string = configure.develop.redis.port;
const DEV_REDIS_NAME: string = configure.develop.redis.name;
const DEV_REDIS_PW: string = configure.develop.redis.pw;
const DEV_REDIS_ACCKEY: string = configure.develop.redis.accessKey;
const DEV_REDIS_REFKEY: string = configure.develop.redis.refreshKey;

const MAIN_DB_URI: string = configure.main.database.uri;
const MAIN_DB_PORT: string = configure.main.database.port;
const MAIN_URI: string = configure.main.uri;
const MAIN_PORT: string = configure.main.port;
const MAIN_DB_HOST: string = configure.main.database.host;
const MAIN_DB_PASSWORD: string = configure.main.database.password;
const MAIN_DB_DATABASE: string = configure.main.database.database;
const MAIN_DB_USER: string = configure.main.database.user;

const MAIN_REDIS_HOST: string = configure.main.redis.host;
const MAIN_REDIS_PORT: string = configure.main.redis.port;
const MAIN_REDIS_NAME: string = configure.main.redis.name;
const MAIN_REDIS_PW: string = configure.main.redis.pw;
const MAIN_REDIS_ACCKEY: string = configure.main.redis.accessKey;
const MAIN_REDIS_REFKEY: string = configure.main.redis.refreshKey;

function getDbUser(condition: string): string{
    if(condition === "dev")
        return DEV_DB_USER;
    else
        return MAIN_DB_USER;
}
function getDbHost(condition: string): string{
    if(condition === "dev")
        return DEV_DB_HOST;
    else
        return MAIN_DB_HOST;
}

function getDbPassword(condition: string): string{
    if(condition === "dev")
        return DEV_DB_PASSWORD;
    else
        return MAIN_DB_PASSWORD;
}

function getDbDatabase(condition: string): string{
    if(condition === "dev")
        return DEV_DB_DATABASE;
    else
        return MAIN_DB_DATABASE;
}
function getDomainUri(condition: string): string{
    if(condition === "dev")
        return DEV_URI;
    else
        return MAIN_URI;
}
function getDomainPort(condition: string): string{
    if(condition === "dev")
        return DEV_PORT;
    else
        return MAIN_PORT;
}
function getDbUri(condition: string): string{
    if(condition === "dev")
        return DEV_DB_URI;
    else
        return MAIN_DB_URI;
}

function getDbPort(condition: string): string{
    if(condition === "dev")
        return DEV_DB_PORT;
    else
        return MAIN_DB_PORT;
}

function getRedisHost(condition: string): string{
    if(condition === "dev")
        return DEV_REDIS_HOST;
    else
        return MAIN_REDIS_HOST;
}

function getRedisPort(condition: string): string{
    if(condition === "dev")
        return DEV_REDIS_PORT;
    else
        return MAIN_REDIS_PORT;
}
function getRedisName(condition: string): string{
    if(condition === "dev")
        return DEV_REDIS_NAME;
    else
        return MAIN_REDIS_NAME;
}
function getRedisPW(condition: string): string{
    if(condition === "dev")
        return DEV_REDIS_PW;
    else
        return MAIN_REDIS_PW;
}

function getRedisAcc(condition: string): string{
    if(condition === "dev")
        return DEV_REDIS_ACCKEY;
    else
        return MAIN_REDIS_ACCKEY;
}

function getRedisRef(condition: string): string{
    if(condition === "dev")
        return DEV_REDIS_REFKEY;
    else
        return MAIN_REDIS_REFKEY;
}

function getRedisURL(condition: string): string{
    return `redis://${getRedisName(condition)}:${getRedisPW(condition)}@${getRedisHost(condition)}:${getRedisPort(condition)}`
}
export { getDbUser, getDbHost, getDbPassword, getDbDatabase, getDomainUri, getDomainPort, getDbUri, getDbPort, getRedisURL}