import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue';
export default defineConfig({
  plugins: [vue()],
  build: {
    target: 'modules',
    // 打包文件目录
    outDir: 'es',
    //压缩
    minify: false,
    rollupOptions: {
      external: ['vue'],
      input: ['src/index.ts'],
      output: {
        entryFileNames: '[name].js',
        preserveModules: true,
        preserveModulesRoot: 'src',
      },
    },
    lib: {
      entry:'./src',
      formats: ['es', 'cjs'],
    }
  }
})