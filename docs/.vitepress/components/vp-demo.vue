<template>
  <ClientOnly>
    <p text="sm" v-html="decodedDescription" />
    <div class="example">
      <Example :file="path" :demo="demo" />
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Example from './demo/vp-example.vue'

const props = defineProps({
  demo: Object,
  description: String,
  source: String,
  path: String,
  rawSource: String,
})
const decodedDescription = computed(() => decodeURIComponent(props.description))
</script>
