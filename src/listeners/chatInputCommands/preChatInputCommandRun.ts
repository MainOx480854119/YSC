import { Events, Listener, type PreChatInputCommandRunPayload } from '@sapphire/framework';

export class PreChatInputCommandRunListener extends Listener<typeof Events.PreChatInputCommandRun> {
  public async run(payload: PreChatInputCommandRunPayload) {
    this.container.logger.warn('pre command run is running...');
    this.container.logger.warn(payload);

    await payload.interaction.deferReply();
  }
}
