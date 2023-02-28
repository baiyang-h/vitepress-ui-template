import path from 'path'
import fs from 'fs'
import mdContainer from 'markdown-it-container'
import { highlight } from '../utils/highlight'
import { docRoot } from '../utils/paths'

const mdPlugin = (md) => {
  // 该部分只处理 :::demo 到 ::: 的部分
  md.use(mdContainer, 'demo', {
    validate(params) {
      return params.trim().match(/^demo\s*(.*)$/)
    },
    // tokens 是对整个md文件的虚拟列表   idx 是虚拟列表上 :::demo 和结尾 ::: 的索引，即tokens中:::demo  ::: 部分
    // tokens 为 [#h1开始, Table 表格, h1结束, p标签开始, 内容, p标签结束, :::demo开始， 内容， :::结束]  就这样的虚拟列表
    // 当md文件中编译到有 :::demo xxx ::: 的时候会对她进行重新修改， 重新render内容如下
    render(tokens, idx) {
      if (tokens[idx].nesting === 1) {  // 表示 container_demo_open   :::demo 开始
        const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/)
        const description = md.utils.escapeHtml(m[1])  // 描述内容   :::demo 后面的描述部分

        const sourceFileToken = tokens[idx + 2]
        let source = ''
        // :::demo  :::  中的内容 比如 table/base-table
        const sourceFile = sourceFileToken.children?.[0].content ?? ''

        if (sourceFileToken.type === 'inline') {
          // 读取文件
          source = fs.readFileSync(
            path.resolve(docRoot, 'examples', `${sourceFile}.vue`),
            'utf-8'
          )
        }
        // 开始标签
        // demos 是在markdown-transform插件中注入的demos变量，是所有examples文件夹下的文件
        const block = '```vue\n' + source + ' ```'
// console.log(11, md.render(block))
// console.log(22, highlight(source, 'vue'))
        return `<Demo
            :demos="demos"
            path="${sourceFile}"
            raw-source="${encodeURIComponent(source)}"
            source="${encodeURIComponent(md.render(block))}"
            description="${encodeURIComponent(md.render(description))}"
        >`;
      } else {  // container_demo_close    :::结束
        // 结束标签
        return `</Demo>`;
      }
    },
  })

  const defaultRender = md.renderer.rules.fence;
  md.renderer.rules.fence = function (tokens, idx, options, env, self) {
    console.log(tokens)
    return `
      <div class="bbbb">${defaultRender(tokens, idx, options, env, self)}</div>
    `
  }
}

export { mdPlugin }
