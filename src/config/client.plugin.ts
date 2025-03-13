import { Player, PlayerEvent } from 'discord-player';
import {
  Client,
  Collection,
  CommandInteraction,
  Events,
  Interaction,
} from 'discord.js';
import { DefaultExtractors } from '@discord-player/extractor';
import { envs } from './env.plugin.ts';
import type { ILogger } from '../interfaces/logger.interface.ts';
import type { IDiscordCommand } from '../interfaces/discordCommand.interface.ts';
import { loadFiles } from '../utils/load_files.utils.ts';

export class DiscordClient {
  readonly commands: Collection<string, IDiscordCommand>;
  constructor(
    private readonly logger: ILogger,
    private readonly client: Client<boolean>
  ) {
    this.commands = new Collection();
  }

  async turnsOn() {
    this.client.once(Events.ClientReady, (readyClient) => {
      this.logger.logInfo(`I'm ready as: ${readyClient.user.tag}`);
    });
    await this.loadCommands();
    this.loadInteractionResolver();
    await this.client.login(envs.API_TOKEN);
  }
  async addPlayer() {
    // FIXME: Check for a fix to avoid use any, currently there's a type issue

    // deno-lint-ignore no-explicit-any
    const player = new Player(this.client as any);
    await player.extractors.loadMulti(DefaultExtractors);
    player.events.on(PlayerEvent.Error, (_, error) => {
      this.logger.logError(`Player error event: ${error.message}`);
    });
  }

  async loadCommands() {
    const commandsPath = `${import.meta.dirname!}/../commands`;
    const commands = await loadFiles<IDiscordCommand>(commandsPath);
    commands.forEach((command) =>
      this.commands.set(command.data.name, command)
    );
  }

  loadInteractionResolver() {
    this.client.on(
      Events.InteractionCreate,
      async (interaction: Interaction) => {
        if (!interaction.isChatInputCommand()) return;
        const command = this.findCommand(interaction);
        if (!command) return;
        await this.executeCommand(command, interaction);
      }
    );
  }

  findCommand(interaction: CommandInteraction): IDiscordCommand | undefined {
    return this.commands?.get(interaction.commandName);
  }

  async executeCommand(
    command: IDiscordCommand,
    interaction: CommandInteraction
  ) {
    try {
      await command.execute(interaction);
    } catch (error) {
      this.logger.logError((error as Error).message);
      this.logger.logError((error as Error).stack as string);
    }
  }
}
