/* eslint-disable consistent-return */
import {
  type ChatInputCommandDeniedPayload,
  Events,
  Listener,
  type UserError
} from '@sapphire/framework';

export class ChatInputCommandDeniedListener extends Listener<typeof Events.ChatInputCommandDenied> {
  public run(error: UserError, payload: ChatInputCommandDeniedPayload) {
    this.container.logger.warn('command was denied.');

    const { context, message } = error;
    const { interaction } = payload;

    if (Reflect.get(Object(context), 'silent')) return;

    if (interaction.deferred || interaction.replied) {
      return interaction.editReply({
        content: message,
        allowedMentions: { users: [interaction.user.id], roles: [] }
      });
    }

    return interaction.reply({
      content: message,
      allowedMentions: { users: [interaction.user.id], roles: [] },
      ephemeral: true
    });
  }
}
