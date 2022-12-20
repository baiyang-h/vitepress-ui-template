import { defineConfig } from 'vite'
import { resolve } from 'path'
import { MarkdownTransform } from './.vitepress/plugins/markdown-transform'

export default defineConfig(async ({ mode }) => {
  console.log(1)
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