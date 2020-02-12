exports.run = async (client, message, args) => {

    //Requiring embeds
    const { RichEmbed } = require('discord.js');
    const embed = new RichEmbed();

    //Requiring Google API
    const {google} = require('googleapis');
    const youtube = google.youtube({
        version: 'v3',
        auth: process.env.APIKEY
    });

    // Requiring ytdl
    const ytdl = require('ytdl-core-discord');


    if(!message.guild) return;

    if(args.length == 0) {
        message.reply('ingresa una cancion.');
        return;
    }else{

        const query = args.join(' ');

        if(message.member.voiceChannel){
            
            try{
                const conn = await message.member.voiceChannel.join();
                const video =  await youtube.search.list({
                    part: 'id,snippet',
                    q: query,
                    type: 'video',
                    maxResults: 1
                });

                console.log(video.data.items[0]);

                let url = `https://www.youtube.com/watch?v=${video.data.items[0].id.videoId}`;

                const stream = await ytdl(url, { filter: 'audioonly' });
                const dispatcher = conn.playStream(stream);

                embed.setTitle(`Reproduciendo: ${video.data.items[0].snippet.title}`);
                embed.setThumbnail(video.data.items[0].snippet.thumbnails.high.url);
                embed.setDescription(video.data.items[0].snippet.description);
                embed.setColor('RANDOM');
                
                message.reply(embed);

                dispatcher.on('end', () => {
                    conn.disconnect();
                    console.log(' I\'m out');
                });

            }catch(e){
                message.reply(e);
                console.log(e);
            }
            
            
        }else {
            message.reply('conectate a un canal de voz');
        }
    
        


    }

    


}