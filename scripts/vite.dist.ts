import { defineConfig } from "vite";
import vue from '@vitejs/plugin-vue'
import { alias } from './common'

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
      name: 'JuWan',
      entry: './src',
      formats: ['es', 'cjs', 'umd'],
      fileName: 'jw-ui'
    }
  },
  resolve: {
    alias
  }
})