import { defineConfig } from "vite";
import vue from '@vitejs/plugin-vue'
import {fileURLToPath, URL} from "node:url";

export default  defineConfig({
  plugins: [vue()],
  build: {
    target: 'esnext',
    outDir: 'dist',
    emptyOutDir: true,
    minify: true,
    rollupOptions: {
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue'
        }
      },
      external: ['vue']
    },
    lib: {
      name: 'VUI',
      entry: './packages',
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('../packages', import.meta.url)),
    }
  }
})