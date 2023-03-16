<template>
  <el-form ref="formRef" :inline="true" :model="form" class="search">
    <el-form-item label="aaa" prop="aaa">
      <el-input v-model.trim="form.aaa" placeholder="请输入" />
    </el-form-item>
    <el-form-item label="bbb" prop="bbb">
      <el-select v-model.trim="form.bbb" placeholder="请选择" clearable>
        <el-option label="a" value="a" />
        <el-option label="b" value="b" />
      </el-select>
    </el-form-item>
    <el-form-item label="ccc" prop="ccc">
      <el-date-picker
        v-model.trim="form.ccc"
        type="date"
        placeholder="请选择"
      />
    </el-form-item>
    <el-form-item label="ddd" prop="ddd">
      <el-date-picker
        v-model.trim="form.ddd"
        type="daterange"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleSearch">查询</el-button>
      <el-button type="primary" @click="handleReset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref, toRaw } from 'vue'

const formRef = ref(null)
const form = reactive({
  aaa: '',
  bbb: '',
  ccc: null,
  ddd: null,
})

// 查询
const handleSearch = () => {
  console.log(toRaw(form))
}
// 重置
const handleReset = () => {
  if (!formRef.value) return
  formRef.value.resetFields()
}
</script>
