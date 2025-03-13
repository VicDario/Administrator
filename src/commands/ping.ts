import { CommandInteraction, SlashCommandBuilder } from 'discord.js';
import { IDiscordCommand } from '../interfaces/discordCommand.interface.ts';
import { ILogger } from '../interfaces/logger.interface.ts';

class PingCommand implements IDiscordCommand {
  constructor(private readonly logger?: ILogger) {}

  data = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!');

  async execute(interaction: CommandInteraction): Promise<void> {
    this.logger?.logInfo('Ping command executed');
    const message = await interaction.reply({
      content: ':ping_pong: Pong!',
    });
    const ping = message.createdTimestamp - interaction.createdTimestamp;
    await message.edit({
      content: `:ping_pong: Pong! (Took ${ping}ms)`,
    });
  }
}

export default new PingCommand();
