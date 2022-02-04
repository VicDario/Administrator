// Requiring Discord.js && other dependencies
const {Client, Intents} = require('discord.js');
require('dotenv').config(); // requiring .env file

// Defining a new Bot
const client = new Client({intents: [Intents.FLAGS.GUILDS]});

// Saving environment variables
const token = process.env.TOKEN; // Discord token
const prefix = process.env.PREFIX; // Bot prefix

// Initializating
client.on('ready', () => {
  console.log(`I'm ready as: ${client.user.tag}`);
});


// Listening interactions
client.on('interactionCreate', async (interaction) => {
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (!message.content.startsWith(prefix)) return;
  if (message.author.bot) return;

  // Command Handler
  try {
    // Cleanign require cache
    delete require.cache[require.resolve(`./commands/${command}.js`)];

    const rqrCommand = await require(`./commands/${command}.js`);
    rqrCommand.run(client, message, args);
  } catch (e) {
    console.log(e);
    message.reply('no puedo vieja tonta no bes ke toi chikito');
  }
});


client.login(token);

