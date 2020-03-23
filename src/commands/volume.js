exports.run = async (client, message, args) => {

    const conn = await message.member.voiceChannel.join();

    if(message.member.voiceChannel){
        
        conn.dispatcher.setVolume(Number.parseFloat(slice(message.length, message.length - 2 )));
    }

}