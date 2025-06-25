FROM node:22-slim AS build

WORKDIR /app

COPY package.json ./
COPY tsconfig.json ./
COPY src ./src
#COPY public ./public

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "dev"]
