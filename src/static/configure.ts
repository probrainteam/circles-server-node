const DEV_DOMAIN:String = "http://localhost";
const DEV_DB:String = "";
const MAIN_DOMAIN:String = "";
const MAIN_DB:String = "";

function getDomainUri(condition: String): String{
    if(condition === "dev")
        return DEV_DOMAIN;
    else
        return MAIN_DOMAIN;
}
function getDBUri(condition: String): String{
    if(condition === "dev")
        return DEV_DB;
    else
        return MAIN_DB;
}
export { getDomainUri ,getDBUri }