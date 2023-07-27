import { ApplyOptions } from '@sapphire/decorators';
import {
  Events,
  Listener,
  type SapphireClient,
  type StoreRegistryEntries
} from '@sapphire/framework';
import { ActivityType } from 'discord.js';

@ApplyOptions<Listener.Options>({ once: true })
export class ReadyListener extends Listener<typeof Events.ClientReady> {
  public run(client: SapphireClient<true>) {
    const { logger } = this.container;
    logger.info(`Logged in as ${client.user.tag}`);
    this.printStoreDebugInformation();

    client.user.setPresence({
      activities: [
        {
          name: 'テスト起動',
          type: ActivityType.Competing
        }
      ],
      status: 'dnd'
    });
  }

  private printStoreDebugInformation() {
    const { client, logger } = this.container;
    const stores = [...client.stores.values()];
    const last = stores.pop();
    if (!last) return;

    stores.forEach((store) => {
      logger.info(this.styleStore(store, false));
    });
    logger.info(this.styleStore(last, true));
  }

  private styleStore(store: StoreRegistryEntries[keyof StoreRegistryEntries], last: boolean) {
    return `  ${last ? '└─' : '├─'} Loaded ${store.size.toString().padEnd(3, ' ')} ${store.name}.`;
  }
}
