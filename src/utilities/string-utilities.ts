export function splitMessage(text: string, size = 1990): string[] {
  const chunks: string[] = [];

  // 文字列を指定されたサイズで分割して配列に追加
  for (let i = 0; i < text.length; i += size) {
    chunks.push(text.substring(i, i + size));
  }

  return chunks;
}

export function removeSpecialCharacters(input: string): string {
  // eslint-disable-next-line no-control-regex
  const regex = /[\x1B\x9B][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g;
  return input.replace(regex, '');
}
