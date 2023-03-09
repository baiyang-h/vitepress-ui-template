import { defineConfig } from 'vite'

export default defineConfig(async ({ mode }) => {
  return {
    resolve: {
      alias: [
        // {
        //   find: '~',
        //   replacement: resolve(__dirname, '.vitepress'),
        // },
      ]
    },
    plugins: []
  }
})