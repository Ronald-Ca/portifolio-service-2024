# Etapa de build
FROM node:14 AS build

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

RUN yarn build

# Etapa de produção
FROM node:14

WORKDIR /app

COPY --from=build /app ./
COPY --from=build /app/node_modules ./node_modules

EXPOSE 3000

CMD ["node", "dist/server.js"]