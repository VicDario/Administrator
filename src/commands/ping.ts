import { CommandInteraction, SlashCommandBuilder } from 'discord.js';
import { IDiscordCommand } from '../interfaces/discordCommand.interface.ts';

const pingCommand: IDiscordCommand = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!'),
  async execute(interaction: CommandInteraction): Promise<void> {
    const message = await interaction.reply({
      content: ':ping_pong: Pong!',
      fetchReply: true,
    });
    const ping = message.createdTimestamp - interaction.createdTimestamp;
    await message.edit({
      content: `:ping_pong: Pong! (Took ${ping}ms)`,
    });
  },
};

export default pingCommand;
