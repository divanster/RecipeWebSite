FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 19000

CMD ["npx", "react-native", "start"]
