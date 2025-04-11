import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/**/*.ts'],
  format: ['esm', 'cjs'],
  dts: {
    entry: 'src/index.ts',
    resolve: true
  },
  splitting: false,
  sourcemap: true,
  clean: true,
  minify: true,
  outExtension({ format }) {
    return {
      js: format === 'esm' ? '.mjs' : '.js',
    }
  },
  treeshake: true,
  esbuildOptions(options) {
    options.target = 'es2020'
  }
});