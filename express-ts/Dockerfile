FROM node:14.18 as base

WORKDIR /home/node/app

COPY package*.json ./

RUN npm i

COPY . .

# Using name of service
# ENV MONGO_URL=mongodb://mongo:27017/test

ENV NODE_PATH=./dist

RUN npm run build