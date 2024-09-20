import { CommandInteraction, SlashCommandBuilder } from 'discord.js';

export interface IDiscordCommand {
  data: SlashCommandBuilder;
  execute: (commandInteraction: CommandInteraction) => Promise<void>;
}
