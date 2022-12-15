FROM node:16.15-bullseye as base

WORKDIR /app

COPY package.json package-lock.json tsconfig.json /app/

COPY src /app/src

ENV NODE_ENV=PROD

RUN npm i
RUN npm run build
CMD npm start
