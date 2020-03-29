exports.run = async (client, message, args) => {

    if(message.member.voiceChannel){
        try{

            const conn = await message.member.voiceChannel.join();

           if(!conn.speaking){
                conn.dispatcher.resume();
            }else {
                message.channel.send('No se puede reanudar.');
            }

        }catch(err){
            console.log(err);
        }
    }

}