import { copyFileSync, existsSync } from 'node:fs';
import { defineConfig } from 'tsup';
import { esbuildPluginVersionInjector } from 'esbuild-plugin-version-injector';

export default defineConfig({
  clean: true,
  bundle: false,
  entry: ['src/**/*.ts', '!src/**/*.d.ts'],
  format: ['cjs'],
  platform: 'node',
  outDir: 'dist',
  minify: false,
  tsconfig: 'tsconfig.json',
  splitting: false,
  skipNodeModulesBundle: true,
  keepNames: true,

  sourcemap: false,
  dts: false,

  esbuildPlugins: [esbuildPluginVersionInjector()],

  async onSuccess() {
    const schemaPath = './prisma/schema.prisma';
    if (existsSync(schemaPath)) {
      copyFileSync(schemaPath, './dist/schema.prisma');
    }
  }
});
