import { CommandInteraction, SlashCommandBuilder } from 'discord.js';
import { IDiscordCommand } from '../interfaces/discord_command.interface.ts';
import { useQueue } from 'discord-player';
import { ILogger } from '../interfaces/logger.interface.ts';
import { Logger } from '../config/logger.plugin.ts';

class PauseCommand implements IDiscordCommand {
  constructor(private readonly logger?: ILogger) {}

  data = new SlashCommandBuilder()
    .setName('resume')
    .setDescription('Resumes the latest song');

  async execute(interaction: CommandInteraction) {
    const queue = useQueue(interaction.guildId!);
    if (queue?.node && !queue?.node.isPlaying) {
      queue.node.setPaused(false);
      await interaction.reply({ content: 'Playing!' });
    } else await interaction.reply({ content: 'No song is currently playing' });
  }
}

export default new PauseCommand(new Logger());
