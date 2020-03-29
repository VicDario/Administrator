exports.run = async (client, message, args) => {

    if(message.member.voiceChannel){
        try{

            const conn = await message.member.voiceChannel.join();

            if(conn.speaking){
                conn.dispatcher.pause();
            }else {
                message.channel.send('No se esta reproduciendo nada.');
            }

        }catch(err){
            console.log(err);
        }
    }

}