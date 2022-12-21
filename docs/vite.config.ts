import { defineConfig } from 'vite'
import { resolve } from 'path'
import { MarkdownTransform } from './.vitepress/plugins/markdown-transform'

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
    plugins: [
      MarkdownTransform()
    ]
  }
})