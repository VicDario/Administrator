FROM node:18-bulleye
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json", "/usr/src/app/"]
RUN npm install --omit=dev
COPY . .
EXPOSE $PORT
CMD ["npm", "start"]
