import { promises as fs } from 'node:fs';
import path from 'node:path';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v10';
import { envs } from './config/env.plugin.ts';
import type { IDiscordCommand } from './interfaces/discordCommand.interface.ts';

(async () => {
  try {
    const commands = [];
    const commandsPath = path.resolve(
      path.basename(import.meta.dirname!),
      'commands'
    );
    const commandsFilesPaths = await fs.readdir(commandsPath);
    const commandsFiles = commandsFilesPaths.map((file) =>
      import(`${commandsPath}/${file}`).then<IDiscordCommand>(
        (command) => command.default
      )
    );
    for await (const command of commandsFiles) {
      commands.push(command.data.toJSON());
    }

    const rest = new REST({ version: `${envs.API_VERSION}` }).setToken(
      envs.API_TOKEN
    );
    await rest.put(Routes.applicationCommands(envs.CLIENT_ID), {
      body: commands,
    });
  } catch (error) {
    console.error(error);
  }
})();
