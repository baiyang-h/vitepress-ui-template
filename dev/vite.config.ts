import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { alias } from '../scripts/common'

export default defineConfig({
  plugins: [vue()],
  root: './dev',
  resolve: {
    alias
  }
})