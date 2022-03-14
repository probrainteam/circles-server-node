# !bin/bash
# Check if database ready
MAX_TRY=8
CURRENT_TRY=0

# Check parm
if [ $# -eq 1 ]; then
    if [ $1 == reset ]; then
        echo "\033[33mUsing reset parm\033[0m"
        docker rm -f dev_db
        docker rm -f logger-db
        docker rm -f Probrain_redis
    else
        echo "\033[31m Wrong parm..\033[0m"
        exit -1;
    fi
fi

# Wrapper
function check_status {
    echo "\033[34m"
    bash -c "./wait-for-it.sh -s -t 60 $1"
    echo "\033[0m"
    if [ $? ==  0 ]; then
        echo "\033[32m ...Success\033[0m";
        #sleep 1
    else
        echo "\033[31m >> ...Failed\033[0m";
        exit -1;
    fi
}

if [ -f ".env" ]; then
    export $(cat .env | sed 's/#.*//g' | xargs) # env file load
    echo "Using development .env"
else
    echo "There is no .env.local !!"
    exit -1
fi
export $(cat .env | sed 's/#.*//g' | xargs) # env file load

# Docker ping tests
# check_status "localhost:${MYSQL_PORT}"
# check_status "localhost:${REDIS_PORT}"
# check_status "localhost:${MONGO_PORT}"

# Mysql ping test
until echo '\q' | docker exec dev_db mysql -h "${MYSQL_HOST}" -P"${MYSQL_PORT}" -u"${MYSQL_USER}" -p"${MYSQL_PASSWORD}" ${MYSQL_DATABASE}> /dev/null 2>&1; do
    if [ $CURRENT_TRY -eq $MAX_TRY ]; then
        echo "\033[31mMYSQL is unavailable - Abort\033[0m";
        exit -1;
    else
        >&2 echo "\033[33mMySQL is unavailable - sleeping 5sec\033[0m";
    sleep 5
    fi
    
    CURRENT_TRY=$((CURRENT_TRY+1))
done
echo "\033[32mMYSQL is ready\033[0m";

CURRENT_TRY=0

# mongo ping test
until echo '\q' | docker exec logger-db mongo --host ${MONGO_HOST} ${MONGO_INITDB_DATABASE} -u${MONGO_USER_NAME} -p${MONGO_USER_PASSWORD} --authenticationDatabase ${MONGO_INITDB_ROOT_USERNAME}> /dev/null 2>&1; do
    if [ $CURRENT_TRY -eq $MAX_TRY ]; then
        echo "\033[31mMONGO is unavailable - Abort\033[0m";
        docker ps
        docker logs --tail 50 --follow --timestamps logger-db
        exit -1;
    else
        >&2 echo "\033[33mMONGO is unavailable - sleeping 5sec\033[0m";
    sleep 5
    fi
    
    CURRENT_TRY=$((CURRENT_TRY+1))
done
echo "\033[32mMONGO is ready\033[0m";