FROM node:14-alpine as base

WORKDIR /src
COPY package*.json /
EXPOSE 3000

FROM base as production
ENV NODE_ENV=production
ENV TZ=Asia/Seoul 
RUN yarn install && yarn build
COPY . /

FROM base as dev
ENV TZ=Asia/Seoul 
RUN npm install -g nodemon && yarn install
COPY . /
