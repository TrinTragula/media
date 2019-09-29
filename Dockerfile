FROM node:10

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN mkdir storage

COPY . .
RUN npm run build

EXPOSE 8080

CMD [ "node", "server.js" ]