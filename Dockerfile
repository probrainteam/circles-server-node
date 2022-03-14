FROM node:14-alpine as base

WORKDIR /src
COPY package*.json /
COPY yarn*.lock /

FROM base as development
ENV TZ=Asia/Seoul
# RUN npm install typescript -g
# RUN npm install -g ts-node
RUN yarn install
COPY . /
