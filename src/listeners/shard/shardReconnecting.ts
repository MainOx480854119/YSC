import { Listener, type Events } from '@sapphire/framework';

export class ShardReconnectingListener extends Listener<typeof Events.ShardReconnecting> {
  public run(id: number) {
    this.container.logger.warn(`[SHARD ${id}] Reconnecting (pid: ${process.pid})`);
  }
}
