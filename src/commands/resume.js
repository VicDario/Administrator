exports.run = async (client, message, args) => {

    if(message.member.voice.channel){
        try{

            const conn = await message.member.voice.channel.join();
            const dispatcher = conn.dispatcher;

            if(dispatcher.paused){
                dispatcher.resume();
            }else {
                message.channel.send('No se puede reanudar.');
            }

        }catch(err){
            console.log(err);
        }
    }

}