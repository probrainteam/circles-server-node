# !bin/bash
MAX_TRY=8
CURRENT_TRY=0

echo "$TEST"
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

if [ -f ".env.local" ]; then
    \cp .env.local .env
    export $(cat .env | sed 's/#.*//g' | xargs) # env file load
    echo "Using development .env"
else
    echo "There is no .env.local !!"
    exit -1
fi

# docker 실행
bash -c "docker-compose -f 'docker-compose.yml' up -d --build dev_db redis"
docker-compose ps


# Docker ping test
check_status "localhost:${DB_PORT}"
check_status "localhost:${REDIS_PORT}"

# Mysql ping test
# @TODO :: mysql: [Warning] Using a password on the command line interface can be insecure. 출력 안되게 변경
until echo '\q' | docker exec dev_db mysql -h "${DB_HOST}" -P"${DB_PORT}" -u"${DB_USER}" -p"${DB_PASSWORD}" ${DB_DATABASE}; do
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