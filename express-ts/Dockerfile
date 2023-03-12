FROM node:14.18

WORKDIR /app

COPY ./package.json ./

RUN npm install \ && npm install typescript -g

# RUN npm install pm2 -g

COPY . .

RUN tsc

EXPOSE 8000

# CMD ["pm2-runtime", "app.js"]
CMD [ "node", "dist/src/app.js" ]