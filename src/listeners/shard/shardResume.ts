import type { Events } from '@sapphire/framework';
import { Listener } from '@sapphire/framework';

export class ShardResumeListener extends Listener<typeof Events.ShardResume> {
  public run(id: number, replayedEvents: number) {
    this.container.logger.warn(
      `[SHARD ${id}] Resumed: ${replayedEvents} events replayed. (pid: ${process.pid})`
    );
  }
}
