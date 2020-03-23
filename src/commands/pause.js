exports.run = async (client, message, args) => {

    if(message.member.voiceChannel){
        try{

            const conn = await message.member.voiceChannel.join();

            if(conn.speaking){
                conn.dispatcher.pause();
                // conn.disconnect();
                message.reply('este comando esta en fase no se, puede que no responda como deberia y marico el que lo lea');
            }else {
                message.channel.send('No se esta reproduciendo nada.');
            }

        }catch(err){
            console.log(err);
        }
    }

}