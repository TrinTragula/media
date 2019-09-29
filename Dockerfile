FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production
RUN npm run build

RUN mkdir storage

COPY . .

EXPOSE 8080

CMD [ "node", "server.js" ]