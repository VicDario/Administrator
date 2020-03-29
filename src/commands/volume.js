exports.run = async (client, message, args) => {

    const conn = await message.member.voiceChannel.join();
    if(message.member.voiceChannel && Number.parseFloat(message.content.slice(7)) > 0 && Number.parseFloat(message.content.slice(7)) < 101){
        
       conn.dispatcher.setVolume(Number.parseFloat(message.content.slice(7)) / 100);

    }else{
        message.reply("Ocurrio un problema");
    }

}