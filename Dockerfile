FROM node:16.10.0
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json", "/usr/src/app/"]
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]