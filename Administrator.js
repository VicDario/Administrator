const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const args = message.content.slice(prefix.length).trim().split(/ +/g);
const command = args.shift().toLowerCase();

client.on("ready", () => {
   console.log("Estoy listo!");
});

var prefix = config.prefix;

client.on("message", (message) => {

 if (!message.content.startsWith(config.prefix)) return;
 if (message.author.bot) return;

 if(command === 'kick' ){

  let user = message.mentions.users.first();
  let razon = args.slice(1).join(' ');
  
  if (message.mentions.users.size < 1) return message.reply('Debe mencionar a alguien.').catch(console.error);
  if (!razon) return message.channel.send('Escriba una razón, `-kick @username [razón]`');
  if (!message.guild.member(user).kickable) return message.reply('No puedo patear al usuario mencionado.');
   
  message.guild.member(user).kick(razon);
  message.channel.send(`**${user.username}**, fue pateado del servidor, razón: ${razon}.`);
 }
  if (command === 'ping') {

    let ping = Math.floor(message.client.ping);
  
    message.channel.send(":ping_pong: Pong!")
     .then(m => {

       m.edit(`:incoming_envelope: Ping Mensajes: \`${Math.floor(m.createdTimestamp - Date.now())} ms\`\n:satellite_orbital: Ping DiscordAPI: \`${ping} ms\``);
    
  });
  
}
});
client.login(config.token);     
       