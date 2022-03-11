FROM node:14-alpine as base

WORKDIR /src
COPY package*.json /

# FROM base as production
# ENV NODE_ENV=production
# ENV TZ=Asia/Seoul 
# RUN yarn install && yarn build
# COPY . /

FROM base as development
ENV TZ=Asia/Seoul
RUN npm install typescript -g
RUN npm install -g ts-node
RUN npm install -g nodemon && yarn install
COPY . /
