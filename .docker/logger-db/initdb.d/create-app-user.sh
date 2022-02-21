#!/bin/bash
# 다른 방식으론 아래가 있음
# https://www.stuartellis.name/articles/shell-scripting/#enabling-better-error-handling-with-set
# https://github.com/docker-library/mongo/blob/master/docker-entrypoint.sh#L303
set -e

# @TODO :: 환경변수 의존 
mongosh <<EOF
use admin
db.auth('admin','qwer1234')
db.createUser({
  user:  'logger',
  pwd: 'qwer1234',
  roles: [{
    role: 'readWrite',
    db: 'logs'
  }]
})
EOF