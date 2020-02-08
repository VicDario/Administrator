exports.run = async (client, message, args) => {
    const collaborator = process.env.COLLABORATOR;
    const admin = process.env.ADMIN;

    const { RichEmbed } = require('discord.js');
    const embed = new RichEmbed();
    
    let option = args.shift();

    switch(option){
        case 'new': 

            try{
                let roleName = args.shift();
                if(roleName){
                    if(message.member.roles.has(admin) || message.member.roles.has(collaborator)){
                        let roleColor = args.shift().toUpperCase();
        
                        await message.guild.createRole({name: roleName, color: roleColor});
                        embed.setTitle(`Rol ${roleName}`);
                        embed.setColor(roleColor);
                        embed.setDescription(`Se ha creado un nuevo rol con exito.`);
                        message.reply(embed);
                    }else {
                        message.reply('Solo los Colaboradores y Admins pueden crear nuevos roles')
                    }
                }else{
                    message.reply('El rol debe tener un nombre: -role new "nombreRol" "colorRol"');
                }
               
            }catch(e){
                console.log(e);
            }
        
        break;

        case 'list': 
            try{
                const roles = message.guild.roles;
                embed.setTitle('Lista de Roles');
                embed.setColor('RANDOM');
                let desc = '';
                for(value of roles){
                    desc += value[1].name + '\n';
                }
                embed.setDescription(desc);
                message.reply(embed);
            }catch(e){
                console.log(e);
            }
        break;
        default: message.reply('debes elegir una opcion. para mas inf.');
    }
   
}