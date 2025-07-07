import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import basicSsl from '@vitejs/plugin-basic-ssl';
import inject from '@rollup/plugin-inject';
import rollupNodePolyFill from 'rollup-plugin-node-polyfills';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    basicSsl(),
    react(),
  ],
  server: {
    https: true,
    host: true,
    port: 5173,
  },
  resolve: {
    alias: {
      process: path.resolve(__dirname, 'node_modules/process/browser.js'),
      stream: path.resolve(__dirname, 'node_modules/stream-browserify/index.js'),
      buffer: path.resolve(__dirname, 'node_modules/buffer/index.js'),
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process: true,
          buffer: true,
        }),
        NodeModulesPolyfillPlugin(),
      ],
    },
  },
  build: {
    rollupOptions: {
      external: ['@toruslabs/eccrypto'],
      plugins: [
        inject({
          global: ['globalThis', 'global'],
          process: 'process',
          Buffer: ['buffer', 'Buffer'],
        }),
        rollupNodePolyFill(),
      ],
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});
