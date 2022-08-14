const fs = require('fs');
const {REST} = require('@discordjs/rest');
const {Routes} = require('discord-api-types/v9');
const path = require('path');
require('dotenv').config();

const clientId = process.env.CLIENT_ID;
const token = process.env.TOKEN;
const apiVersion = process.env.API_VERSION;

const commands = [];
const commandFiles = fs.readdirSync(
    path.resolve(path.basename(__dirname),
        'commands'),
)
    .filter((file) =>
      file.endsWith('.js'),
    );

for (const file of commandFiles) {
  const command = require(
      path.resolve(path.basename(__dirname), 'commands', file),
  );
  commands.push(command.data.toJSON());
}

const rest = new REST({version: `${apiVersion}`}).setToken(token);

(async () => {
  try {
    await rest.put(
        Routes.applicationCommands(clientId),
        {body: commands},
    );
  } catch (error) {
    console.error(error);
  }
})();
