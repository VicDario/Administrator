// Requiring Discord.js && other dependencies 
const Discord = require("discord.js");
require('dotenv').config(); // requiring .env file 

// Defining a new Bot
const client = new Discord.Client(); 

// saving environment variables
const token = process.env.TEST_TOKEN; // Discord token
const prefix = process.env.PREFIX; // Bot prefix

// Initializating 
client.on("ready", () => {
   console.log(`I'm ready as: ${client.user.tag}`);
});


// Listening messages
client.on("message", async (message) => {

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (!message.content.startsWith(prefix)) return;
  if (message.author.bot) return;

  // Command Handler

  try{
    delete require.cache[require.resolve(`./commands/${command}.js`)]; // Cleanign require cache

    let rqr_command = await require(`./commands/${command}.js`);
    rqr_command.run(client, message, args);

  }catch(e) {
    console.log(e);
    message.reply('no puedo vieja tonta no bes ke toi chikito');
  }

});


client.login(token);     
       
