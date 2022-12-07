FROM node:18

WORKDIR /usr/app

COPY . .

RUN npm ci && npm run build

CMD [ "npm", "run", "start" ]