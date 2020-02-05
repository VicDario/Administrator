exports.run = (client, message, args) =>{

    // Requires 
    const { RichEmbed } = require('discord.js'); // Requiring richembed class to create embed messages
    const fs = require('fs');

    // Finding commands
    const commands = fs.readdirSync('./src/commands');

    // Creating embed message
    const embed = new RichEmbed() 
    .setTitle('Lista de Comandos') // set the embed message title
    .setColor(0x726eef) // set embed color
    .setDescription(content(commands)); // embed content 

    message.channel.send(embed);
    //-kick @User -motivo \n-clear @User\n-ping
}

function content(commands){
    let str = '';
    for(item of commands){
        let new_item = item.split('.').shift();
        str += ('-' + new_item + '\n');
    }

    return str;
}