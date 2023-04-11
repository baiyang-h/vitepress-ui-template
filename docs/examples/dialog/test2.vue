<template>
  <el-button type="primary" @click="handleClick">点击</el-button>

  <MyDialog
    ref="dialogRef"
    @onCancel="handleCancel"
    @onOk="handleOk"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import MyDialog from "./base-dialog2.vue";

const dialogRef = ref(null)

const handleClick = () => {
  if(!dialogRef.value) return
  let params = {a: 1}
  dialogRef.value.open(params)
}

const handleCancel = () => {
  console.log('取消')
}

const handleOk = () => {
  console.log('OK')
}
</script>
