# Etapa de build
FROM node:latest AS build

WORKDIR /app

# Copia arquivos de dependências
COPY package.json yarn.lock ./

# Instala as dependências
RUN yarn

# Copia apenas o arquivo schema.prisma e a pasta prisma (se existir)
COPY prisma ./prisma

# Gera o Prisma Client
RUN yarn prisma generate

# Copia o restante dos arquivos do projeto
COPY . .

# Compila o projeto
RUN yarn build

# Etapa de produção
FROM node:latest

WORKDIR /app

# Copia os arquivos necessários para produção
COPY --from=build /app/build ./build
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json

# Expõe a porta da aplicação
EXPOSE 1818

# Comando para rodar o servidor
CMD ["node", "./build/src/server.js"]
