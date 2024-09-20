import {
  CommandInteraction,
  Message,
  SlashCommandBuilder,
  SlashCommandOptionsOnlyBuilder,
} from 'discord.js';

export interface IDiscordCommand {
  data: SlashCommandBuilder | SlashCommandOptionsOnlyBuilder;
  execute: (
    commandInteraction: CommandInteraction
  ) => Promise<void> | Promise<Message<boolean>>;
}
