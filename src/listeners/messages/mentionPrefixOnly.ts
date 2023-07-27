import { Events, Listener } from '@sapphire/framework';
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Colors,
  EmbedBuilder,
  codeBlock,
  type Message
} from 'discord.js';
import { formatCode } from '../../utilities/code-utilities';
import { removeSpecialCharacters, splitMessage } from '../../utilities/string-utilities';

const deleteButton = new ButtonBuilder()
  .setCustomId('delete_message')
  .setLabel('メッセージを削除')
  .setStyle(ButtonStyle.Danger);

export class MentionPrefixOnlyListener extends Listener<typeof Events.MentionPrefixOnly> {
  public async run(message: Message) {
    const targetMessageId = message.reference?.messageId;
    if (!targetMessageId) return;

    const component = new ActionRowBuilder<ButtonBuilder>().setComponents(deleteButton).toJSON();

    const targetMessage = await message.channel.messages.fetch(targetMessageId);
    const formatResults = await formatCode(targetMessage.content).catch((error) => {
      void message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setTitle('コードの解析中に以下のエラーが発生しました。')
            .setDescription(codeBlock('js', removeSpecialCharacters(`${error}`)))
            .setColor(Colors.DarkRed)
        ],
        components: [component]
      });
    });

    if (!Array.isArray(formatResults)) return;

    const results = formatResults
      .map(({ code, extension }) =>
        splitMessage(code).map((message) => ({ text: message, extension }))
      )
      .flat();
    const lastResult = results.pop()!;

    // eslint-disable-next-line no-restricted-syntax
    for await (const { extension, text } of results) {
      await message.channel.send(codeBlock(extension, text));
    }

    void message.channel.send({
      content: codeBlock(lastResult.extension, lastResult.text),
      components: [component]
    });
  }
}
