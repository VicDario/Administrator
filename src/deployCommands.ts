import { promises as fs } from 'fs';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v10';
import path from 'path';
import { envs } from './config/env.plugin';
import { IDiscordCommand } from './interfaces/discordCommand.interface';

(async () => {
  try {
    const commands = [];
    const commandsPath = path.resolve(path.basename(__dirname), 'commands');
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
