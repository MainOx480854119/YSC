import { Events, Listener } from '@sapphire/framework';
import type { Snowflake } from 'discord.js';

export class ShardReadyListener extends Listener<typeof Events.ShardReady> {
  public run(id: number, unavailableGuilds: Set<Snowflake> | undefined) {
    this.container.logger.info(
      `[SHARD ${id}] Ready: ${
        unavailableGuilds?.size ?? 'Unknown or no unavailable'
      } guilds (pid: ${process.pid})`
    );
  }
}
