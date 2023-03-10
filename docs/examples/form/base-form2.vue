<template>
  <el-form
    ref="formRef"
    :model="form"
    :rules="rules"
    label-width="80px"
  >
    <el-row>
      <el-form-item label="文本1" prop="aa1">
        <el-input v-model="form.aa1" clearable placeholder="请输入" />
      </el-form-item>
      <el-form-item label="文本2" prop="aa2">
        <el-input v-model="form.aa2" clearable placeholder="请输入" />
      </el-form-item>
      <el-form-item label="文本3" prop="aa3">
        <el-input v-model="form.aa3" clearable placeholder="请输入" />
      </el-form-item>
    </el-row>
    <el-row>
      <el-form-item label="选择框1" prop="bb1">
        <el-select v-model="form.bb1" placeholder="请选择" clearable>
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择框1" prop="bb2">
        <el-select v-model="form.bb2" placeholder="请选择" clearable>
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
    </el-row>
    <el-row>
      <el-form-item label="日期1" prop="cc1">
        <el-date-picker
          v-model="form.cc1"
          type="date"
          placeholder="选择日期"
          style="width: 100%"
        />
      </el-form-item>
      <el-form-item label="日期2" prop="cc2">
        <el-date-picker
          v-model="form.cc2"
          type="date"
          placeholder="选择日期"
          style="width: 100%"
        />
      </el-form-item>
    </el-row>
    <el-form-item label="活动形式" prop="desc">
      <el-input v-model="form.desc" type="textarea" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleSubmit">创建</el-button>
      <el-button @click="handleReset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'

const formRef = ref()
const form = reactive({
  aa1: '',
  aa2: '',
  aa3: '',
  bb1: '',
  bb2: '',
  cc1: '',
  cc2: '',
  desc: ''
})

const rules = reactive({
  aa1: [
    { required: true, message: '请输入', trigger: 'blur' },
    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
  ],
  aa2: [
    { required: true, message: '请输入', trigger: 'blur' },
  ],
})

const handleSubmit = () => {
  if (!formRef.value) return
  formRef.value.validate((valid, fields) => {
    if (valid) {
      console.log(form)
    } else {
      console.log('error submit!', fields)
    }
  })
}

const handleReset = () => {
  if (!formRef.value) return
  formRef.value.resetFields()
}
</script>

<style scoped lang="scss">
.el-form {
  .el-form-item {
    flex: 1;
    .el-select {
      width: 100%;
    }
  }
}
</style>
