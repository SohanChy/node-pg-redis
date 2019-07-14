FROM node:12-alpine

RUN yarn global add node-pre-gyp
RUN mkdir /app
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn
COPY . .

ENV APP_PORT 3000
# EXPOSE 8080
# CMD [ "node", "-r", "dotenv/config","./app/start.js" ]

