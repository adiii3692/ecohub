FROM node:23-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm i
COPY . .
EXPOSE 5555
CMD [ "npm", "start"]