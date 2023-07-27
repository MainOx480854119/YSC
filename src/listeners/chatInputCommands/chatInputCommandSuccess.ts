import { type ChatInputCommandSuccessPayload, Events, Listener } from '@sapphire/framework';

export class ChatInputCommandSuccessListener extends Listener<
  typeof Events.ChatInputCommandSuccess
> {
  public run(payload: ChatInputCommandSuccessPayload) {
    this.container.logger.warn('command was success.');
    this.container.logger.warn(payload);
  }
}
