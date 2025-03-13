import { CommandInteraction, SlashCommandBuilder } from 'discord.js';
import { IDiscordCommand } from '../interfaces/discord_command.interface.ts';
import { useQueue } from 'discord-player';
import { ILogger } from '../interfaces/logger.interface.ts';
import { Logger } from '../config/logger.plugin.ts';

class PauseCommand implements IDiscordCommand {
  constructor(private readonly logger?: ILogger) {}

  data = new SlashCommandBuilder()
    .setName('pause')
    .setDescription('Pauses the currently playing song');

  async execute(interaction: CommandInteraction) {
    this.logger?.logInfo('Pause command executed');
    const queue = useQueue(interaction.guildId!);
    if (queue?.node.isPlaying) {
      queue.node.setPaused(true);
      await interaction.reply({ content: 'Paused the current song' });
    } else await interaction.reply({ content: 'No song is currently playing' });
  }
}

export default new PauseCommand(new Logger());
