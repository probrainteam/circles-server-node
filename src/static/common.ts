// Static variables
import * as configure from "./configure.json";
const DEV_DB_URI:String = configure.develop.database.uri;
const DEV_DB_PORT: String = configure.develop.database.port;
const DEV_URI: String = configure.develop.uri;
const DEV_PORT: String = configure.develop.port;

const MAIN_DB_URI: String = configure.main.database.uri;
const MAIN_DB_PORT: String = configure.main.database.port;
const MAIN_URI: String = configure.main.uri;
const MAIN_PORT: String = configure.main.port;

function getDomainUri(condition: String): String{
    if(condition === "dev")
        return DEV_URI;
    else
        return MAIN_URI;
}
function getDomainPort(condition: String): String{
    if(condition === "dev")
        return DEV_PORT;
    else
        return MAIN_PORT;
}
function getDBUri(condition: String): String{
    if(condition === "dev")
        return DEV_DB_URI;
    else
        return MAIN_DB_URI;
}

function getDBPort(condition: String): String{
    if(condition === "dev")
        return DEV_DB_PORT;
    else
        return MAIN_DB_PORT;
}
export { getDomainUri, getDomainPort, getDBUri, getDBPort}