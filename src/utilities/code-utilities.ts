import { tryParseJSON } from '@sapphire/utilities';
import hljs from 'highlight.js';
import { readFileSync } from 'node:fs';
import { Options, format, getSupportInfo } from 'prettier';

export const prettierOptions = tryParseJSON(
  readFileSync(`${process.cwd()}/.prettierrc`, 'utf8')
) as Options;

export const languageSubset = [
  // prettier supported languages
  'javascript',
  'javascriptreact',
  'typescript',
  'typescriptreact',
  'json',
  'jsonc',
  'json5',
  'yaml',
  'html',
  'css',
  'postcss',
  'less',
  'scss',
  'vue',
  'graphql',
  'handlebars',
  'mongo',
  'markdown',
  'mdx',
  'yaml',
  'ansible',
  'home-assistant',

  // othor languages
  'actionscript',
  'applescript',
  'bash',
  'basic',
  'brainfuck',
  'csharp',
  'c',
  'cpp',
  'coffeescript',
  'dart',
  'diff',
  'dockerfile',
  'elixir',
  'f#',
  'erlang',
  'fortran',
  'go',
  'haskell',
  'toml',
  'java',
  'kotlin',
  'lisp',
  'livescript',
  'lua',
  'nginx',
  'nix',
  'objectivec',
  'php',
  'perl',
  'powershell',
  'python',
  'r',
  'ruby',
  'rust',
  'sql',
  'scala',
  'scheme',
  'shell',
  'swift',
  'vbscript',
  'vim'
];

export interface FormatResult {
  code: string;
  extension: string;
}

export async function formatCode(code: string): Promise<FormatResult[]> {
  const info = await getSupportInfo();
  const prettierSupportedLanguages = info.languages
    .map(({ vscodeLanguageIds }) => vscodeLanguageIds)
    .flat() as string[];
  const autoHighlightResult = hljs.highlightAuto(code, languageSubset);
  const language = autoHighlightResult.language ?? '';

  if (!prettierSupportedLanguages.some((lang) => lang === language)) {
    return [{ code, extension: language }];
  }

  const formatted = await format(code, {
    filepath: `${process.cwd()}/src/dummy.ts`,
    ...prettierOptions
  });

  return [{ code: formatted, extension: language }];
}
