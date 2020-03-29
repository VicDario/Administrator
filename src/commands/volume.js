exports.run = async (client, message, args) => {

    const conn = await message.member.voiceChannel.join();
    if(message.member.voiceChannel && Number.parseFloat(message.content.slice(7)) > 0 && Number.parseFloat(message.content.slice(7)) < 11){
        
       conn.dispatcher.setVolume(Number.parseFloat(message.content.slice(7)) / 10);

    }else{
        message.reply("Ocurrio un problema");
    }

}