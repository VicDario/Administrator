// Requiring Discord.js && other dependencies
const {Client, GatewayIntentBits, Collection} = require('discord.js');
const fs = require('fs');
const path = require('path');
const {token} = require('./config');

// Defining a new Bot
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
  ],
});

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
  if (!interaction.isChatInputCommand()) return;
  const command = client.commands.get(interaction.commandName);
  if (!command) return;
  // Command Handler
  try {
    await command.execute(interaction, client);
  } catch (error) {
    console.error(error);
    const message =
      error.cause === 'Personalized' ?
        error.message :
        'No puedo vieja tonta no bes ke toi chikito';

    await interaction.reply(
        {
          content: message,
          ephemeral: true,
        },
    );
  }
});
client.login(token);
