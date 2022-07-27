FROM node:18.6.0
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json", "/usr/src/app/"]
RUN npm install --omit=dev
COPY . .
EXPOSE $PORT
CMD ["npm", "start"]
