import path from 'node:path';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v10';
import { envs } from './config/env.plugin.ts';
import type { IDiscordCommand } from './interfaces/discordCommand.interface.ts';
import { loadFiles } from './utils/load_files.utils.ts';

(async () => {
  try {
    const commandsPath = `${import.meta.dirname!}/commands`;
    const commands = await loadFiles<IDiscordCommand>(commandsPath);
    const commandsDataJson = commands.map((command) => command.data.toJSON());

    const rest = new REST({ version: envs.API_VERSION }).setToken(
      envs.API_TOKEN
    );
    await rest.put(Routes.applicationCommands(envs.CLIENT_ID), {
      body: commandsDataJson,
    });
  } catch (error) {
    console.error(error);
  }
})();
