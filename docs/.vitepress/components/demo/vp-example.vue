<template>
  <div class="example-showcase">
    <ClientOnly>
      <component :is="demo" v-bind="$attrs"  v-if="demo" />
    </ClientOnly>
  </div>
</template>

<script setup>
defineProps( {
  demo: {
    type: Object,
    required: true
  }
})
</script>

<style scoped lang="scss">
.example-showcase {
  //padding: 24px;
  //background-color: var(--bg-color);
}
</style>
