import { Listener, type Events } from '@sapphire/framework';
import type { CloseEvent } from 'discord.js';

export class ShardDisconnectListener extends Listener<typeof Events.ShardDisconnect> {
  public run(event: CloseEvent, id: number) {
    this.container.logger.error(
      [`[SHARD ${id}] Disconnected(pid: ${process.pid}): `, `Code: ${event.code}`].join('\n\t')
    );
  }
}
