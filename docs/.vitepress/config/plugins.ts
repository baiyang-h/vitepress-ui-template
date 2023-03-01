import path from 'path'
import fs from 'fs'
import mdContainer from 'markdown-it-container'
import { highlight } from '../utils/highlight'
import { docRoot } from '../utils/paths'

const mdPlugin = (md) => {
  const defaultFenceRender = md.renderer.rules.fence;
  // // // md.renderer.rules.fence 代码块部分，重写渲染规则
  // md.renderer.rules.fence = function (tokens, idx, options, env, self) {
  //   const preToken = tokens[idx-1]
  //   const isDemoToken = preToken.info.trim().match(/^demo\s*(.*)$/)
  //   // 表示是 :::demo  xx ::: 的这种格式
  //   if(tokens[idx].type === 'fence' && tokens[idx].src && isDemoToken && preToken.type === 'container_demo_open') {
  //
  //   }
  //   console.log(env)
  //   // 否则返回原本
  //   return defaultFenceRender(tokens, idx, options, env, self)
  // }
  // 该部分只处理 :::demo 到 ::: 的部分
  md.use(mdContainer, 'demo', {
    validate(params) {
      return params.trim().match(/^demo\s*(.*)$/)
    },
    // tokens 是对整个md文件的虚拟列表   idx 是虚拟列表上 :::demo 和结尾 ::: 的索引，即tokens中:::demo  ::: 部分
    // tokens 为 [#h1开始, Table 表格, h1结束, p标签开始, 内容, p标签结束, :::demo开始， 内容， :::结束]  就这样的虚拟列表
    // 当md文件中编译到有 :::demo xxx ::: 的时候会对她进行重新修改， 重新render内容如下
    render(tokens, idx, options, env, self) {
      if (tokens[idx].nesting === 1) {  // 表示 container_demo_open   :::demo 开始
        const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/)
        const description = md.utils.escapeHtml(m[1])  // 描述内容   :::demo 后面的描述部分

        const nextToken = tokens[idx + 1]  // 即 ::demo  ::: 中的路径

        let sourcePath = ''
        let source = ''
        if(nextToken.type === 'fence' && nextToken.src) {
          // C:/Users/xx/Desktop/vitepress-ui/docs/examples/table/base-table.vue
          sourcePath = nextToken.src.replace(/\\/g, '/');
          source = encodeURIComponent(fs.readFileSync(sourcePath).toString());
        }

        return `<Demo
          path="${sourcePath}"
          source="${source}"
          description="${encodeURIComponent(md.render(description))}"
        >
      `;
      } else {  // container_demo_close    :::结束
        // 结束标签
        return `</Demo>`;
      }
    },
  })
}

export { mdPlugin }
