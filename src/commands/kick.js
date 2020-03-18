exports.run = (client, message, args) => { // Kicking an user

  const collaborator = process.env.COLLABORATOR;
  const admin = process.env.ADMIN;


  let user = message.mentions.users.first();
  let razon = args.slice(1).join(' ');

  if(message.member.roles.has(admin) || message.member.roles.has(collaborator)){
    
    // // if (message.mentions.users.size < 1) return message.reply('Debe mencionar a alguien.').catch(console.error);
    // if (!razon) return message.channel.send('Escriba una razón, `-kick @username [razón]`');
    // // if (!message.guild.member(user).kickable) return message.reply('No puedo patear al usuario mencionado.');
    //  
    // message.guild.member(user).kick(razon);
    // message.channel.send(`**${user.username}**, fue pateado del servidor, razón: ${razon}.`);
    console.log(user);
  }else {
    message.reply('ysi noquiero q');
  }
  
  }