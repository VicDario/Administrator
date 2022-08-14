FROM node:18-bullseye
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json", "/usr/src/app/"]
RUN npm install --omit=dev
COPY . .
EXPOSE $PORT
CMD ["npm", "start"]
