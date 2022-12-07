<template>
  <div>
    <el-row style="margin-bottom: 20px">
      <el-button type="primary" @click="onOk">提交</el-button>
      <el-button type="primary" @click="resetFields">重置</el-button>
      <el-button type="primary" @click="setFieldsValue">设置值(传入对象)</el-button>
      <el-button type="primary" @click="setFieldsValue2">设置值(传入函数)</el-button>
      <el-button type="primary" @click="getFieldsValue">获取值</el-button>
    </el-row>
  </div>
</template>

<script setup>
import {markRaw, reactive, ref} from "vue";
import { ElMessage } from 'element-plus'

const formRef = ref(null)

const option = reactive(_option)

const onOk = (values) => {
  if(!formRef.value) return
  formRef.value.validate((valid) => {
    if(valid) {
      console.log(values)
      ElMessage({
        message: '成功',
        type: 'success',
      })
    }
  })
}
const onCancel = () => {
  ElMessage('取消')
}
const resetFields = () => {
  formRef.value.resetFields()
}
</script>
