
FROM node:18-alpine

WORKDIR /home/sistema_academico

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]