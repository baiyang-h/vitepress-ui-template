import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig(async ({ mode }) => {
  return {
    resolve: {
      alias: [
        {
          find: '@docs',
          replacement: resolve(__dirname, '../docs'),
        },
      ]
    },
  }
})