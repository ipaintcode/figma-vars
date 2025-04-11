import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    'index': 'src/index.ts',
  },
  format: ['esm', 'cjs'],
  dts: true,
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
  external: ['react', 'react-dom', '@figma-vars/core', '@figma/plugin-typings'],
  esbuildOptions(options) {
    options.target = 'es2020'
    options.jsx = 'automatic'
  }
})