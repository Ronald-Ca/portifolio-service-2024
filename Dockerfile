# Etapa de build
FROM node:20 AS build

WORKDIR /app

# Instalar dependências
COPY package.json yarn.lock ./
RUN yarn

# Copiar código do projeto
COPY . .

# Construir a aplicação
RUN yarn build

# Etapa de produção
FROM node:20

WORKDIR /app

# Copiar arquivos necessários para o ambiente de produção
COPY --from=build /app/build ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json

EXPOSE 1818

# Iniciar o servidor
CMD ["node", "./src/server.js"]
