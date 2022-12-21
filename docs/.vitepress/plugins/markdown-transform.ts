import path from 'path'
import { docRoot } from '../utils/paths'

import type { Plugin } from 'vite'

type Append = Record<'headers' | 'footers' | 'scriptSetups', string[]>

export function MarkdownTransform(): Plugin {
  return {
    name: 'vite-plugin-vue-md-transform',
    enforce: 'pre',
    transform(code, id) {  // code md中的内容 ， id是解析得到的文件路径（md文件）
      if(!id.endsWith('.md')) return
      const componentId = path.basename(id, '.md')
      const scriptSetups = combineScriptSetup(`const demos = import.meta.globEager('../../examples/${componentId}/*.vue')`)
      const compPath = path.resolve(docRoot, 'component')
      if(id.startsWith(compPath)) {
      }
      return combineMarkdown(code, scriptSetups)
    }
  }
}

const combineScriptSetup = (code) => `
  \n<script setup>
  ${code}
</script>
`

const combineMarkdown = (code, scriptSetups) => {
  // 首先查找第一个 ## 的位置
  const firstSubheader = code.indexOf('##')
  // 找到第一个 ## 的位置，如果没有，则再尾部插入
  const sliceIndex = firstSubheader < 0 ? code.length : firstSubheader

  code = code.slice(0, sliceIndex) + scriptSetups +code.slice(sliceIndex)
  return code
}
