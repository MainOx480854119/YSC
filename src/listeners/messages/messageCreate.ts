import { Events, Listener } from '@sapphire/framework';
import type { Message } from 'discord.js';

export class MessageCreateListener extends Listener<typeof Events.MessageCreate> {
  public run(message: Message) {
    if (message) return;

    const { logger } = this.container;
  }
}
