<template>
  <el-button type="primary" @click="dialogVisible  = true">
    点击展示弹框
  </el-button>

  <el-dialog
    title="标题"
    :close-on-click-modal="false"
    width="30%"
    v-model="dialogVisible"
  >
    <div>这里可以自定义</div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleOk">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const dialogVisible = ref(false)

// 取消
const handleCancel = () => {
  dialogVisible.value = false
}
// 确定
const handleOk = () => {
  dialogVisible.value = false
}
</script>
<style scoped lang="scss">

</style>
