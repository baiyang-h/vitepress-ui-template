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

      <div class="hidden-code-b" v-if="sourceVisible" @click="handleHiddenCode">隐藏代码</div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { computed, ref  } from 'vue'
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


const handleCopy = () => {
  ElMessage({
    message: '复制成功',
    type: 'success',
  })
  navigator.clipboard.writeText(decodeURIComponent(props.source));
}

const handleHiddenCode = () => {
  sourceVisible.value = false
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

  .hidden-code-b {
    position: sticky;
    bottom: 0;
    z-index: 10;
    color: #409eff;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: #fff;
    //border-top: 1px solid var(--border-color);
    cursor: pointer;
  }
}
</style>
