FROM node:23-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm i
COPY . .

ARG VITE_BASE_URL
ENV VITE_BASE_URL=$VITE_BASE_URL

RUN npm run build
EXPOSE 5173
CMD ["npm","run","dev"]