import {
  APIEmbedField,
  CommandInteraction,
  GuildMember,
  SlashCommandBuilder,
  EmbedBuilder,
} from 'discord.js';
import { useMainPlayer } from 'discord-player';
import { IDiscordCommand } from '../interfaces/discord_command.interface.ts';

class PlayCommand implements IDiscordCommand {
  data = new SlashCommandBuilder()
    .setName('play')
    .setDescription('Plays music from some sources')
    .addStringOption((option) =>
      option
        .setName('name')
        .setDescription('The name of the song to play')
        .setRequired(true)
    );

  async execute(interaction: CommandInteraction): Promise<void> {
    const voiceChannel = (interaction.member as GuildMember)?.voice.channel;
    if (!voiceChannel) {
      await interaction.reply({
        content: 'You must be connected to a voice channel! :sweat_smile:',
      });
      return;
    }

    const player = useMainPlayer();
    const query = interaction.options.get('name', true);
    const songName = query.value as string;
    await interaction.deferReply();
    await interaction.editReply({
      content: `Looking for your track - "${songName}"`,
    });
    try {
      const { track } = await player.play(voiceChannel.id, songName, {
        nodeOptions: {
          metadata: interaction.channel,
          bufferingTimeout: 15000,
          leaveOnStop: true,
        },
      });

      await interaction.editReply({ content: 'Loading your track' });
      const musicEmbed = new EmbedBuilder()
        .setColor('Random')
        .setTitle(track?.title)
        .setDescription(`Author: ${track?.author}`)
        .addFields({
          name: 'Source',
          value: track?.raw?.source,
        } as APIEmbedField)
        .setThumbnail(track?.thumbnail);

      await interaction.editReply({
        content: 'Your Song is ready!',
        embeds: [musicEmbed],
      });
    } catch (error) {
      console.log(error);
      await interaction.editReply({
        content: 'Something wrong happen',
      });
    }
  }
}

export default new PlayCommand();
