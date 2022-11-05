const {SlashCommandBuilder} = require('@discordjs/builders');
const {google} = require('googleapis');
const ytdl = require('ytdl-core');
const {
  AudioPlayerStatus,
  StreamType,
  createAudioPlayer,
  createAudioResource,
  joinVoiceChannel,
} = require('@discordjs/voice');
const {EmbedBuilder} = require('discord.js');
const {generateError} = require('../utils');
const {apiKey} = require('../config');

module.exports = {
  data: new SlashCommandBuilder()
      .setName('play')
      .setDescription('Plays music from youtube')
      .addStringOption((option) =>
        option.setName('name')
            .setDescription('The name of the song to play')
            .setRequired(true)),
  async execute(interaction) {
    const voiceChannel = interaction.member.voice.channel;
    if (!voiceChannel?.id) throw generateError('Conectate a un chat de voz!');
    const ChannelOptions = {
      channelId: voiceChannel.id,
      guildId: voiceChannel.guild.id,
      adapterCreator: voiceChannel.guild.voiceAdapterCreator,
    };
    const connection = joinVoiceChannel(ChannelOptions);
    const youtube = google.youtube({
      version: 'v3',
      auth: apiKey,
    });
    const query = interaction.options.getString('name');
    const video = await youtube.search.list({
      part: 'id,snippet',
      q: query,
      type: 'video',
      maxResults: 1,
    });

    const url = `https://www.youtube.com/watch?v=${video.data.items[0].id.videoId}`;
    const stream = ytdl(url, {filter: 'audioonly'});
    const resource = createAudioResource(
        stream,
        {inputType: StreamType.Arbitrary},
    );
    const player = createAudioPlayer();
    player.play(resource);
    connection.subscribe(player);
    player.on(AudioPlayerStatus.Idle, () => connection.destroy());

    const musicEmbed = new EmbedBuilder()
        .setColor('Random')
        .setTitle(video.data.items[0].snippet.title)
        .setDescription(video.data.items[0].snippet.description)
        .setThumbnail(video.data.items[0].snippet.thumbnails.high.url);

    interaction.reply({embeds: [musicEmbed]});
  },
};
