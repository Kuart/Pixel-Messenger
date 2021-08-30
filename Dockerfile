FROM node:14

WORKDIR /user/pixel_chat

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD npm run serve