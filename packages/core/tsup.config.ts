import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/variables.ts'],
  format: ['cjs', 'esm'],
  dts: false,
  splitting: true,
  sourcemap: true,
  clean: false,
  treeshake: true,
  minify: true,
  target: 'es2020',
  outDir: 'dist',
  external: ['@figma/plugin-typings'],
  noExternal: [],
  esbuildOptions(options) {
    // @ts-ignore - esbuild options typing issue
    options.banner = {
      js: '"use strict";',
    };
  },
});