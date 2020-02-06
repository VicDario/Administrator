exports.run = async(client, message, args) => {

    const collaborator = process.env.COLLABORATOR;
    const admin = process.env.ADMIN;
    
    const { RichEmbed } = require('discord.js');
    const embed = new RichEmbed();
    // || '673715489796653107'
    try{
        if(message.member.roles.has(admin) || message.member.roles.has(collaborator)){
            let roleName = args.shift();
            let roleColor = args.shift().toUpperCase();

            await message.guild.createRole({name: roleName, color: roleColor});
            embed.setTitle(`Rol ${roleName}`);
            embed.setColor(roleColor);
            embed.setDescription(`Se ha creado un nuevo rol con exito.`);
            message.reply(embed);
        }else {
            message.reply('Solo los Colaboradores y Admins pueden crear nuevos roles')
        }
    }catch(e){
        console.log(a);
    }

    
}