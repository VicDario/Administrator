exports.run = async (client, message, args) => {
    
    if(!message.guild) return;

    // Dependencies 
    const {google} = require('googleapis');
    const ytdl = require('ytdl-core');
    const { MessageEmbed } = require('discord.js');

    const youtube = google.youtube({
    version: 'v3',
        auth: process.env.APIKEY
    });

    const embed = new MessageEmbed();


    if(args.length == 0) {
        message.reply('ingresa una cancion.');
        return;
    }else{

        const query = args.join(' ');

        if(message.member.voice.channel ){
            
            try{
                const conn = await message.member.voice.channel.join();
                const video =  await youtube.search.list({
                    part: 'id,snippet',
                    q: query,
                    type: 'video',
                    maxResults: 1
                });

                // console.log(video.data.items[0]);

                let url = `https://www.youtube.com/watch?v=${video.data.items[0].id.videoId}`;

                const stream = await ytdl(url, { filter: 'audioonly' });
                const dispatcher = conn.play(stream, { quality: 'highestaudio' });

                embed.setTitle(`Reproduciendo: ${video.data.items[0].snippet.title}`);
                embed.setThumbnail(video.data.items[0].snippet.thumbnails.high.url);
                embed.setDescription(video.data.items[0].snippet.description);
                embed.setColor('RANDOM');
                
                message.reply(embed);

                dispatcher.on('speaking', (value) => { // return a 0 if stopped speaking
                    setTimeout(() => {
                        if(!value && !dispatcher.paused){
                            conn.disconnect();
                        }
                    }, 2000); // delaying the disconnet so the pause command can work properly
                });

            }catch(e){
                console.log(e);
            }
            
            
        }else {
            message.reply('conectate a un canal de voz');
        }

    }

}