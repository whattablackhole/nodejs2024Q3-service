FROM node:23-alpine3.19

WORKDIR /app

COPY package*.json ./

RUN npm ci && npm cache clean --force

COPY . .

CMD ["sh", "-c", "npx prisma migrate deploy && npx prisma generate && npm run start:dev"]