import type { SapphireClient } from '@sapphire/framework';

declare module 'discord.js' {
  export interface Message {
    readonly client: SapphireClient<true>;
  }
}
