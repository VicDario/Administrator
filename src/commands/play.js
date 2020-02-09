exports.run = async (client, message, args) => {

    // const { spawn } = require('child_process');

    const ffmpegPath = require('ffmpeg-static');
    // spawn(ffmpegPath, ['-i', 'video.mkv', 'video.mp4']);

    //Requiring Google API
    const {google} = require('googleapis');
    const youtube = google.youtube({
        version: 'v3',
        auth: process.env.APIKEY
    });

    if(!message.guild) return;

    if(message.member.voiceChannel){
        // message.member.voiceChannel.join();
        console.log(process.env.PATH)
    }else {
        message.reply('conectate a un canal de voz');
    }

    // try{
    //     const video =  await youtube.search.list({
    //         part: 'id,snippet',
    //         q: 'goosebumps',
    //         type: 'video',
    //         maxResults: 1
    //     });
    //     console.log(video.data.items[0].snippet.thumbnails);
    // }catch(e){
    //     console.log(e);
    // }


}