FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json ./
COPY client/package.json client/package-lock.json ./client/
COPY server/package.json server/package-lock.json ./server/
COPY . .

RUN npm run build


FROM node:20-alpine AS production

WORKDIR /app

COPY --from=builder /app/package.json ./
COPY --from=builder /app/server/node_modules ./server/node_modules
COPY --from=builder /app/server/ . /app/server/
COPY --from=builder /app/client/dist ./client/dist

EXPOSE 3000

CMD ["npm", "start"]
