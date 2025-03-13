import { CommandInteraction, SlashCommandBuilder } from 'discord.js';
import { IDiscordCommand } from '../interfaces/discordCommand.interface.ts';
import { useQueue } from 'discord-player';

class PauseCommand implements IDiscordCommand {
  data = new SlashCommandBuilder()
    .setName('pause')
    .setDescription('Pauses the currently playing song');

  async execute(interaction: CommandInteraction) {
    const queue = useQueue(interaction.guildId!);
    if (queue?.node.isPlaying) {
      queue.node.setPaused(true);
      await interaction.reply({ content: 'Paused the current song' });
    } else await interaction.reply({ content: 'No song is currently playing' });
  }
}

export default new PauseCommand();
