<template>
  <ClientOnly>
    <p text="sm" v-html="decodedDescription" />
    <div class="example">
      <Example :file="path" :demo="formatPathDemos[path]" />

      <ElDivider class="m-0" />

      <div>
        213
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Example from './demo/vp-example.vue'

const props = defineProps({
  demos: Object,
  description: String,
  source: String,
  path: String,
  rawSource: String,
})
const decodedDescription = computed(() => decodeURIComponent(props.description))
const formatPathDemos = computed(() => {
  const demos = {}
  Object.keys(props.demos).forEach(key => {
    demos[key.replace('../../examples/', '').replace('.vue', '')] = props.demos[key].default
  })
  return demos
})
</script>
