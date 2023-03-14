FROM node:14 as base

WORKDIR /home/node/app

COPY package*.json ./

RUN npm i

COPY . .

ENV PORT=4000

# Using name of service
ENV MONGO_URL=mongodb://mongo:27017/test

FROM base as production

ENV NODE_PATH=./build

RUN npm run build