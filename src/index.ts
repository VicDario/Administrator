import { Client, GatewayIntentBits } from 'discord.js';
import { DiscordClient } from './config/client.plugin.ts';
import { Logger } from './config/logger.plugin.ts';

const logger = new Logger();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
  ],
});
const discordClient = new DiscordClient(logger, client);
discordClient.turnsOn();
discordClient.addPlayer();
