FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run prisma:generate
RUN npm run build

EXPOSE 3333

CMD ["sh", "-c", "npm run prisma:migrate && npm run start"]