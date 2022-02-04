exports.run = (client, message, args) =>{
  // Requiring MessageEmbed class to create embed messages
  const {MessageEmbed} = require('discord.js');

  // Command List
  const commands =
`
-clear [@user]opcional
-kick [@user] [motivo]
-ping
-play [nombre_cancion]
-volume [1-100]
-resume
-pause
-role list
-role new [nombre_rol]  
-set_role [@user] [rol]
`;

  // Creating embed message
  const embed = new MessageEmbed()
      .setTitle('Lista de Comandos') // set the embed message title
      .setColor('RANDOM') // set embed color 0x726eef
      .setDescription(commands); // embed content

  message.channel.send(embed);
};


