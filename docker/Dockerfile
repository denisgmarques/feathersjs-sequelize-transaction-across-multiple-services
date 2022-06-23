FROM node:14-alpine AS node-packages

RUN apk update && apk upgrade && apk add git wget curl bash

RUN mkdir -p /usr/src/feathersjs-sequelize-transaction-across-multiple-services

WORKDIR /usr/src/feathersjs-sequelize-transaction-across-multiple-services
RUN mkdir -p src
COPY package.json ./
RUN npm install -g npm@latest
RUN npm install --unsafe-perm

FROM node-packages AS node-app
WORKDIR /usr/src/feathersjs-sequelize-transaction-across-multiple-services
COPY src ./src
COPY config ./config

EXPOSE 3000
CMD [ "npm", "run", "start" ]
