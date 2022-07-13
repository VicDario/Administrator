FROM node:16.16.0-bullseye-slim
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json", "/usr/src/app/"]
RUN npm install --production
COPY . .
EXPOSE $PORT
CMD ["npm", "start"]