# !bin/bash
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
bash -c './wait-for-it.sh -t 60 localhost:${DB_PORT}'
bash -c './wait-for-it.sh -t 60 localhost:${REDIS_PORT}'
