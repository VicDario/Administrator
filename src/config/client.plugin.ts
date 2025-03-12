import { Player, PlayerEvent } from 'discord-player';
import {
  Client,
  Collection,
  CommandInteraction,
  Events,
  Interaction,
} from 'discord.js';
import { DefaultExtractors } from '@discord-player/extractor';
import { ILogger } from '../interfaces/logger.interface';
import { envs } from './env.plugin';
import { promises as fs } from 'fs';
import path from 'path';
import { IDiscordCommand } from '../interfaces/discordCommand.interface';

export class DiscordClient {
  readonly commands: Collection<string, IDiscordCommand>;
  constructor(
    private readonly logger: ILogger,
    private readonly client: Client
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
    const player = new Player(this.client);
    await player.extractors.loadMulti(DefaultExtractors);
    player.events.on(PlayerEvent.Error, (_, error) => {
      this.logger.logError(`Player error event: ${error.message}`);
    });
  }

  async loadCommands() {
    const commandsPath = path.resolve(__dirname, '..', 'commands');
    const commandsFilesPaths = await fs.readdir(commandsPath);
    const commands = commandsFilesPaths.map((file) =>
      import(`${commandsPath}/${file}`).then<IDiscordCommand>(
        (command) => command.default
      )
    );
    for await (const command of commands) {
      this.commands.set(command.data.name, command);
    }
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
