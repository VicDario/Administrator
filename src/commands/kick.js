exports.run = (client, message, args) => { // Kicking an user

  const collaborator = process.env.COLLABORATOR;
  const admin = process.env.ADMIN;

  if(message.member.roles.has(admin) || message.member.roles.has(collaborator)){
    let user = message.mentions.users.first();
    let razon = args.slice(1).join(' ');
    
    if (message.mentions.users.size < 1) return message.reply('Debe mencionar a alguien.').catch(console.error);
    if (!razon) return message.channel.send('Escriba una razón, `-kick @username [razón]`');
    if (!message.guild.member(user).kickable) return message.reply('No puedo patear al usuario mencionado.');
     
    message.guild.member(user).kick(razon);
    message.channel.send(`**${user.username}**, fue pateado del servidor, razón: ${razon}.`);
  }else {
    message.reply('no tienes permiso de hacer eso maldito, toy arrecho >:(');
  }
  
  }