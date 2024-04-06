FROM node:20.6.1-alpine

ENV NODE_ENV dev

WORKDIR /usr/src/app

COPY ./package.json ./package-lock.json ./

RUN npm i

COPY . .

EXPOSE 5173

RUN chown -R node:node /usr/src/app

USER node

CMD npm run dev