import { copyFileSync, existsSync } from 'node:fs';
import { defineConfig } from 'tsup';

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
  dts: false
});
