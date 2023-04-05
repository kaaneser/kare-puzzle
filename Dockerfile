FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=5000
ENV NODE_ENV=production

EXPOSE ${PORT}

CMD ["npm", "start"]