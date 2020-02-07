exports.run = async(client, message, args) => {

  const collaborator = process.env.COLLABORATOR;
  const admin = process.env.ADMIN;
  
  const { RichEmbed } = require('discord.js');
  const embed = new RichEmbed();
  const user = message.mentions.users.first();
  
  try{
      if(user){
        console.log(message.guild.roles.array())
      }else{
        message.reply('debes mencionar un usuario')
      }
  }catch(e){
      console.log(e);
  }

  
}