# Etapa de build
FROM node:latest AS build

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn

# Gera os arquivos do Prisma Client
# RUN npx prisma generate

COPY . .

RUN yarn build

# Etapa de produção
FROM node:latest

WORKDIR /app

COPY --from=build /app/build ./
COPY --from=build /app/node_modules ./node_modules

EXPOSE 1818

CMD ["node", "./src/server.js"]