# !bin/bash

# Wrapper
function check_status {
    echo "\033[34m"
    bash -c "./wait-for-it.sh -t 60 $1"
    echo "\033[0m"
    if [ $? ==  0 ]; then
        echo "\033[32m ...Success\033[0m";
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

# docker 내부 서비스 ping test
check_status "localhost:${DB_PORT}"
check_status "localhost:${REDIS_PORT}"
