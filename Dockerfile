FROM node:12-alpine as Builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=development

COPY . .

RUN npm run build

FROM node:12-alpine as production

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=Builder /usr/src/app/dist ./dist

EXPOSE 3000

CMD [ "node", "dist/server" ]