import { ShardingManager } from 'discord.js';
import './lib/setup';

const manager = new ShardingManager(`${process.cwd()}/dist/bot.js`, {
  token: process.env.DISCORD_TOKEN
});

void manager.spawn({ delay: 15500, timeout: 60000 });
