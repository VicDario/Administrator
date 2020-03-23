exports.run = (client, message, args) => { // Kicking an user

  // Administrator and Collaborators ID's
  const collaborator = process.env.COLLABORATOR;
  const admin = process.env.ADMIN;

  // This is for a friend request xdd - Will generate a custom message if you try to kick the specific user
  const tkid = process.env.TK_ID;

  let user = message.mentions.users.first();
  let razon = args.slice(1).join(' ');

  if(message.member.roles.has(admin) || message.member.roles.has(collaborator)){
    
    if (message.mentions.users.size < 1) return message.reply('Debe mencionar a alguien.').catch(console.error);
    if (!razon) return message.channel.send('Escriba una razón, `-kick @username [razón]`');
    if (!message.guild.member(user).kickable) return message.reply('No puedo patear al usuario mencionado.');
     
    message.guild.member(user).kick(razon);
    message.channel.send(`**${user.username}**, fue pateado del servidor, razón: ${razon}.`);
    console.log(user);
  }else {
    if(user.id == tkid){
      message.reply('El niño del grupo no se toca >:(');
      return;
    }
    message.reply('i zi no kiero k');
  }
  
  }