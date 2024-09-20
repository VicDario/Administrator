import { CommandInteraction, SlashCommandBuilder } from 'discord.js';
import { IDiscordCommand } from '../interfaces/discordCommand.interface';

export default {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!'),
  async execute(interaction: CommandInteraction) {
    const message = await interaction.reply({
      content: ':ping_pong: Pong!',
      fetchReply: true,
    });
    const ping = message.createdTimestamp - interaction.createdTimestamp;
    await message.edit({
      content: `:ping_pong: Pong! (Took ${ping}ms)`,
    });
  },
} as IDiscordCommand;
