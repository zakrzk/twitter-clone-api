FROM node:14.10.0-stretch
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g typescript \
    && npm install -g concurrently

RUN npm i
COPY . .

EXPOSE 3005
CMD ["npm", "run", "dev"]
