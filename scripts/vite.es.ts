import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue';
import { alias } from './common'
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
        preserveModulesRoot: 'src',
      },
      external: ['vue'],
    },
    lib: {
      entry:'./src',
      formats: ['es'],
    }
  },
  resolve: {
    alias
  }
})