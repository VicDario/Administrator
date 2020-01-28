// Requiriendo la API de discord.js & otras dependencias
const Discord = require("discord.js");
require('dotenv').config(); // requiero el archivo .env 

// Declarando el bot
const client = new Discord.Client(); 

// Almacenando variables de entorno
const token = process.env.TOKEN; // Almaceno el token guardado en el archivo .env
const prefix = process.env.PREFIX; // Almaceno el prefix de el archivo .env

// Iniciando el bot
client.on("ready", () => {
   console.log(`Estoy listo como: ${client.user.tag}`);
});


// Escuchando un comando
client.on("message", (message) => {

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (!message.content.startsWith(prefix)) return;
  if (message.author.bot) return;

  // Manejador de Comandos

  try{
    delete require.cache[require.resolve(`./comandos/${command}.js`)]; // Se limpia la cache de comandos anteriores

    let usar_comando = require(`./comandos/${command}.js`);
    usar_comando.run(client, message, args);

  }catch(e) {
    console.log(e);
    message.reply('no poseo ese comando por los momentos');
  }

});


client.login(token);     
       