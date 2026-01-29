FROM node:20-alpine AS build

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY prisma ./prisma

RUN yarn prisma generate

COPY . .

RUN yarn build

FROM node:20-alpine AS production

WORKDIR /app

COPY --from=build /app/build ./build
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/yarn.lock ./yarn.lock
COPY --from=build /app/prisma ./prisma

RUN yarn install --production --frozen-lockfile

RUN yarn prisma generate

EXPOSE 3000

CMD ["node", "./build/src/server.js"]
