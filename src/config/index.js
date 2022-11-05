require('dotenv').config(); // requiring .env file

module.exports = {
  clientId: process.env.CLIENT_ID,
  token: process.env.TOKEN,
  apiVersion: process.env.API_VERSION,
  apiKey: process.env.API_KEY,
};
