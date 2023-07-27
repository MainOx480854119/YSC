import { Events, Listener, type MessageCommandErrorPayload } from '@sapphire/framework';
import dedent from 'dedent';

export class MessageCommandErrorListener extends Listener<typeof Events.MessageCommandError> {
  public async run(error: unknown, context: MessageCommandErrorPayload) {
    const { message, command } = context;

    message.channel.send(dedent`
      ${command.name}コマンドの実行に失敗しました。
      エラー : ${error}
    `);
  }
}
