#!/bin/bash
# 다른 방식으론 아래가 있음
# https://www.stuartellis.name/articles/shell-scripting/#enabling-better-error-handling-with-set
# https://github.com/docker-library/mongo/blob/master/docker-entrypoint.sh#L303

set -e # Mongo 환경변수 load
mongo <<EOF
use admin
db.auth('$MONGO_INITDB_ROOT_USERNAME', '$MONGO_INITDB_ROOT_PASSWORD')
db.createUser({
  user:  '$MONGO_USER_NAME',
  pwd: '$MONGO_USER_PASSWORD',
  roles: [{
    role: 'readWrite',
    db: '$MONGO_INITDB_DATABASE'
  }]
})
EOF
