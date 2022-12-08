import path from 'path'
import fs from 'fs'
import mdContainer from 'markdown-it-container'
import { highlight } from '../../utils/highlight'

const VitePressPluginDemoBlockPlus = (md) => {
  md.use(mdContainer, 'demo', {
    validate(params) {
      return params.trim().match(/^demo\s*(.*)$/)
    },
    render(tokens, idx) {
      const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/)
      if (tokens[idx].nesting === 1) {
        const description = md.utils.escapeHtml(m[1])  // 描述内容

        const sourceFileToken = tokens[idx + 2]
        let source = ''
        let demo = ''
        // :::demo  :::  中的内容 比如 table/base-table
        const sourceFile = sourceFileToken.children?.[0].content ?? ''

        if (sourceFileToken.type === 'inline') {
          source = fs.readFileSync(
            path.resolve(__dirname, '../../../examples', `${sourceFile}.vue`),
            'utf-8'
          )
        }

        // 开始标签
        return `<Demo
            demo="${demo}"
            path="${sourceFile}"
            raw-source="${encodeURIComponent(source)}"
            source="${encodeURIComponent(highlight(source, 'vue'))}"
            description="${encodeURIComponent(md.render(description))}"
        >`;
      } else {
        // 结束标签
        return `</Demo>`;
      }
    }
  })
}

export default VitePressPluginDemoBlockPlus