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
      const append = {
        headers: [],
        footers: [],
        scriptSetups: [
          `const demos = import.meta.globEager('../../examples/${componentId}/*.vue')`,
        ],
      }
      const compPath = path.resolve(docRoot, 'component')
      if(id.startsWith(compPath)) {
        console.log(111, id, componentId, code)
        code = transformComponentMarkdown(id, componentId, code, append)
      }
    }
  }
}

const transformComponentMarkdown = (
  id: string,
  componentId: string,
  code: string,
  append: Append,
) => {

}