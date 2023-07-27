import { Listener, type Events } from '@sapphire/framework';

export class ShardErrorListener extends Listener<typeof Events.ShardError> {
  public run(error: Error, id: number) {
    this.container.logger.error(
      `[SHARD ${id}] Error: ${error.stack ?? error.message} (pid: ${process.pid})`
    );
  }
}
