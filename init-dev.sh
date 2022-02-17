# !bin/bash
if [ -f ".env.local" ]; then
    if [ -f ".env" ]; then
        rm -f .env
    fi
    cp .env.local .env
    if [ -f .env ]; then
        export $(cat .env | sed 's/#.*//g' | xargs) # env file load
    fi
    echo "Using development .env"
fi

# docker 실행
bash -c "docker-compose -f 'docker-compose.yml' up -d --build dev_db redis"
docker-compose ps
# docker 내부 서비스 ping test
bash -c './wait-for-it.sh -t 60 localhost:${DB_PORT}'
bash -c './wait-for-it.sh -t 60 localhost:${REDIS_PORT}'
