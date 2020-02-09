exports.run = async (client, message, args) => {

    //Requiring Google API
    const {google} = require('googleapis');
    const youtube = google.youtube({
        version: 'v3',
        auth: process.env.APIKEY
    });

    // Requiring ytdl
    const ytdl = require('ytdl-core');


    if(!message.guild) return;

    if(args.length == 0) {
        message.reply('ingresa una cancion.');
        return;
    }else{

        let query = '';
        for(param of args){
            query += param + ' ';
        }

        if(message.member.voiceChannel){
            
            try{
                const conn = await message.member.voiceChannel.join();
                const video =  await youtube.search.list({
                    part: 'id,snippet',
                    q: query,
                    type: 'video',
                    maxResults: 1
                });

                let url = `https://www.youtube.com/watch?v=${video.data.items[0].id.videoId}`;

                const stream = ytdl(url, { filter: 'audioonly' });
                const dispatcher = conn.playStream(stream);

                dispatcher.on('end', () => voiceChannel.leave());

                console.log(video.data.items[0].snippet.thumbnails);
            }catch(e){
                message.send('se produjo un error al tratar de reproducir la cancion');
                console.log(e);
            }
            
            
        }else {
            message.reply('conectate a un canal de voz');
        }
    
        


    }

    


}