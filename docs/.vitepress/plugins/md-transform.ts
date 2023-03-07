import fs from 'fs'
import mdContainer from 'markdown-it-container'

export const DEMO_COMPOENT_PREFIX = 'Demo__'; // 组件前缀避免名称冲突

export default function mdTransformPlugin(md) {
  // 该部分只处理 :::demo 到 ::: 的部分
  md.use(mdContainer, 'demo', {
    validate(params) {
      return !!params.trim().match(/^demo\s*(.*)$/)
    },
    /**
     *  因为markdown-it-container 配置的原因，所以只对 :::demo ::: 格式的md部分进行重新编译规则修改
     *  @param tokens 所有.md文件的虚拟列表
     *  @param idx 相应的索引
     */
    render(tokens, idx, options, env, self) {
      if (tokens[idx].nesting === 1) {
        let componentIndex = 0;
        const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/)
        const description = m && m.length > 1 ? m[1] : ''  // 描述内容   :::demo 后面的描述部分

        const sourceFileToken = tokens[idx + 1]   // 导入得url路径 token

        let source = ''
        let sourcePath = ''
        if(sourceFileToken.type === 'fence' && sourceFileToken.src) {
          // C:/Users/xx/examples/table/base-table.vue   格式化绝对路径
          sourcePath = sourceFileToken.src.replace(/\\/g, '/');
          // 引入文件得源码
          source = encodeURIComponent(fs.readFileSync(sourcePath).toString());
        }
        if (!source) throw new Error(`Incorrect source file: ${sourcePath}`)

        const componentName = `${DEMO_COMPOENT_PREFIX}${componentIndex += 1}`;

        const scriptSetup = env.sfcBlocks.scriptSetup || {
          content: '<script setup lang="ts">\n</script>',
          tagOpen: '<script setup lang="ts">',
          type: 'script',
          contentStripped: '',
          tagClose: '</script>',
        };
        scriptSetup.contentStripped += `import ${componentName} from '${sourcePath}';\n`;
        scriptSetup.content = `${scriptSetup.tagOpen}${scriptSetup.contentStripped}${scriptSetup.tagClose}`;
        env.sfcBlocks.scriptSetup = scriptSetup;
        env.sfcBlocks.scripts = [scriptSetup];
        /*
        const defaultFenceRender = md.renderer.rules.fence;
         默认就是将 外部的:::demo 覆盖成 Demo，所以代码部分会直接当成slot默认插槽插入进去，如果想手动设置，可以使用下面的写法。注意 idx+1 因为现在的idx不是引入代码处的索引
          :::demo
            代码
          :::
          <template #code>
            ${defaultFenceRender(tokens, idx+1, options, env, self)}
          </template>
         */
        return `<Demo
          path="${sourcePath}"
          source="${source}"
          description="${encodeURIComponent(md.render(description))}"
          :component="${componentName}"
        >`;
      } else {  // container_demo_close    :::结束
        // 结束标签
        return `</Demo>`;
      }
    },
  })
}
