# Etapa de build
FROM node:latest AS build

WORKDIR /app

COPY . .

RUN yarn
RUN yarn build

# Etapa de produção
FROM node:latest

ENV PORT 1818

WORKDIR /app

COPY --from=build /app/package.json .
COPY --from=build /app/build .
COPY --from=build /app/node_modules /node_modules

EXPOSE 1818

CMD ["node", "./src/server.js"]