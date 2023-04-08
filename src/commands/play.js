const {SlashCommandBuilder} = require('@discordjs/builders');
const {EmbedBuilder} = require('discord.js');
const {generateError} = require('../utils');
const {useMasterPlayer} = require('discord-player');

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
    if (!voiceChannel) throw generateError('Conectate a un chat de voz!');
    const player = useMasterPlayer();
    const query = interaction.options.getString('name');
    await interaction.deferReply();
    const searchResult = await player.search(query, {
      requestedBy: interaction.user,
    });
    if (!searchResult.hasTracks()) {
      throw generateError('No encontre resultados!');
    }
    const track = searchResult.tracks[0];
    await player.play(voiceChannel, track, {
      nodeOptions: {
        metadata: interaction,
      },
    });
    await interaction.editReply({content: `Loading your track(s)"}`});
    const musicEmbed = new EmbedBuilder()
        .setColor('Random')
        .setTitle(track?.title)
        .setDescription(`Author: ${track?.author}`)
        .addFields({name: 'Source', value: track?.raw?.source})
        .setThumbnail(track?.thumbnail);

    interaction.editReply({
      content: 'Your Song is ready!',
      embeds: [musicEmbed],
    });
  },
};
