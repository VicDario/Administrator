// Requiring Discord.js && other dependencies
const {Client, Intents, Collection} = require('discord.js');
const fs = require('fs');
const path = require('path');
require('dotenv').config(); // requiring .env file

// Defining a new Bot
const client = new Client({intents: [Intents.FLAGS.GUILDS]});

// Saving environment variables
const token = process.env.TOKEN; // Discord token
// const prefix = process.env.PREFIX; // Bot prefix

// Initializating
client.on('ready', () => {
  console.log(`I'm ready as: ${client.user.tag}`);
});

// Load commands
client.commands = new Collection();
const commandFiles = fs.readdirSync(
    path.resolve(path.basename(__dirname),
        'commands'),
)
    .filter((file) =>
      file.endsWith('.js'),
    );

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  // Set a new item in the Collection
  // With the key as the command name and the value as the exported module
  client.commands.set(command.data.name, command);
}

// Listening interactions
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;
  const command = client.commands.get(interaction.commandName);
  if (!command) return;
  // Command Handler
  try {
    await command.execute(interaction, client);
  } catch (error) {
    console.error(error);
    await interaction.reply(
        {
          content: 'no puedo vieja tonta no bes ke toi chikito',
          ephemeral: true,
        },
    );
  }
});
client.login(token);
