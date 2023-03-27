import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue';
import {fileURLToPath, URL} from "node:url";

export default defineConfig({
  plugins: [vue()],
  build: {
    target: 'modules',
    // 打包文件目录
    outDir: 'es',
    emptyOutDir: true,
    //压缩
    minify: false,
    rollupOptions: {
      output: {
        entryFileNames: '[name].js',
        preserveModules: true,
        preserveModulesRoot: 'packages',
      },
      external: ['vue'],
    },
    lib: {
      entry:'./packages/index.ts',
      formats: ['es'],
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('../packages', import.meta.url)),
    }
  }
})