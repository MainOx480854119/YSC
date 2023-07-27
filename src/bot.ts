import { LogLevel, SapphireClient } from '@sapphire/framework';
import { GatewayIntentBits } from 'discord.js';
import './lib/setup';

const client = new SapphireClient({
  loadMessageCommandListeners: true,
  disableMentionPrefix: false,
  intents: [
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent
  ],
  logger: {
    level: LogLevel.Debug
  },
  shards: 'auto'
});

void client.login();
