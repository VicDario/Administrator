exports.run = async (client, message, args) => {

    const conn = await message.member.voiceChannel.join();

    if(message.member.voiceChannel){
        conn.dispatcher.setVolume(Number.parseFloat(message));
        message.channel.send("A ber");
    }

}