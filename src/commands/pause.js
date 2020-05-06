exports.run = async (client, message, args) => {

    if(message.member.voice.channel){
        try{

            const conn = await message.member.voice.channel.join();
            const dispatcher = conn.dispatcher;

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