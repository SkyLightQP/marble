/** @type {import('vite').UserConfig} */
import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    outDir: 'dist',
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'index',
      formats: ['cjs'],
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      external: ['@prisma/client', '@prisma/client/runtime', '@prisma/client/runtime/index', 'prisma']
    }
  },
  plugins: [
    dts({
      insertTypesEntry: true
    })
  ]
});
