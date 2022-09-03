FROM node:lts-alpine

WORKDIR /exoplex

COPY . .

RUN npm install --only=production

RUN npm run build --prefix client

USER node

CMD [ "npm", "start", "--prefix", "server" ]

EXPOSE 8000
