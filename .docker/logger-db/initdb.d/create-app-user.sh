#!/bin/bash
# 다른 방식으론 아래가 있음
# https://www.stuartellis.name/articles/shell-scripting/#enabling-better-error-handling-with-set
# https://github.com/docker-library/mongo/blob/master/docker-entrypoint.sh#L303

set -e # Mongo 환경변수 load
mongosh <<EOF
use admin
db.auth('admin', '$LOGGER_DB_INITDB_ROOT_PASSWORD')
db.createUser({
  user:  '$LOGGER_DB_INITDB_USER_NAME',
  pwd: '$LOGGER_DB_INITDB_USER_PASSWORD',
  roles: [{
    role: 'readWrite',
    db: '$LOGGER_DB_INITDB_DATABASE'
  }]
})
EOF
