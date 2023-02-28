<template>
  <ClientOnly>
    <p text="sm" v-html="decodedDescription" />
    <div class="example">
      <Example :file="path" :demo="formatPathDemos[path]" />

      <div class="op-btns">
        <ElIcon :size="16" class="op-btn" @click="handleCopy"><Copy /></ElIcon>
        <ElIcon :size="16" class="op-btn" @click="sourceVisible=!sourceVisible"><Code /></ElIcon>
      </div>

      <div
        class="code"
        v-show="sourceVisible"
      >
        <SourceCode :source="source" />
        <slot></slot>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import Example from './demo/vp-example.vue'
import SourceCode from './demo/vp-source-code.vue'
import Copy from './icons/copy.vue'
import Code from './icons/code.vue'
import { ElMessage } from 'element-plus'

const props = defineProps({
  demos: Object,
  description: String,
  source: String,
  path: String,
  rawSource: String,
})

console.log(11, decodeURIComponent(props.rawSource))
console.log(22, decodeURIComponent(props.source))

const sourceVisible = ref(false)
const decodedDescription = computed(() => decodeURIComponent(props.description))
const formatPathDemos = computed(() => {
  const demos = {}
  Object.keys(props.demos).forEach(key => {
    demos[key.replace('../../examples/', '').replace('.vue', '')] = props.demos[key].default
  })
  return demos
})

const handleCopy = () => {
  ElMessage({
    message: '复制成功',
    type: 'success',
  })
  navigator.clipboard.writeText(decodeURIComponent(props.rawSource));
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
}
</style>
