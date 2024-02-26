import react from '@vitejs/plugin-react';
import * as path from 'path';
import { defineConfig } from 'vite';
import commonjs from 'vite-plugin-commonjs';

export default defineConfig({
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'build'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/')
    }
  },
  plugins: [react(), commonjs()]
});
