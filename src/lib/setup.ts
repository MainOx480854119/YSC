import { ApplicationCommandRegistries, RegisterBehavior } from '@sapphire/framework';
// import '@sapphire/plugin-api/register';
import '@sapphire/plugin-logger/register';
import '@sapphire/plugin-subcommands/register';
import { setup } from '@skyra/env-utilities';

ApplicationCommandRegistries.setDefaultBehaviorWhenNotIdentical(RegisterBehavior.LogToConsole);

setup('.env');

declare module '@skyra/env-utilities' {
  interface Env {
    DISCORD_TOKEN: string;
  }
}
