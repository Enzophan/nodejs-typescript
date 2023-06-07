FROM node:14 as base

WORKDIR /home/node/app

COPY package*.json ./

RUN npm i

#Solve the problem reinstaling bcrypt
RUN npm uninstall bcrypt
RUN npm i bcrypt

COPY . .

ENV PORT=4000
ENV SALT=10
ENV EXP_MIN_ACCESS=2
ENV EXP_DATE_REFRESH=2

# Using name of service
ENV MONGO_URL=mongodb://mongo:27017/test

FROM base as production

ENV NODE_PATH=./build

RUN npm run build