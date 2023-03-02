<template>
  <ClientOnly>
    <p text="sm" v-html="decodedDescription" />
    <div class="example">
      <Example :demo="component" />

      <div class="op-btns">
        <ElIcon :size="16" class="op-btn" @click="handleCopy"><Copy /></ElIcon>
        <ElIcon :size="16" class="op-btn" @click="sourceVisible=!sourceVisible"><Code /></ElIcon>
      </div>

      <div
        class="code"
        v-show="sourceVisible"
      >
        <slot>
          <SourceCode :source="source" />
        </slot>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { computed, ref, defineAsyncComponent  } from 'vue'
import Example from './demo/vp-example.vue'
import SourceCode from './demo/vp-source-code.vue'
import Copy from './icons/copy.vue'
import Code from './icons/code.vue'
import { ElMessage } from 'element-plus'

const props = defineProps({
  description: String,
  path: String,
  source: String,
  component: Object
})

const sourceVisible = ref(false)

const decodedDescription = computed(() => decodeURIComponent(props.description))

// 将要加载的动态组件
// const demo = computed(() => {
//   // 相对路径
//   let path = '../../' +  props.path.replace(/[\s\S]*\/examples/, 'examples')
//   return defineAsyncComponent(() => import(/* @vite-ignore */path))
// })

const handleCopy = () => {
  ElMessage({
    message: '复制成功',
    type: 'success',
  })
  navigator.clipboard.writeText(decodeURIComponent(props.source));
}
</script>

<style scoped lang="scss">
.example {
  border: 1px solid var(--border-color);
  border-radius: var(--el-border-radius-base);
  padding: 24px;

  .op-btns {
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .op-btn {
      margin: 0 8px;
      cursor: pointer;
    }
  }

  .code {
    .shiki {
      
    }
  }
}
</style>
