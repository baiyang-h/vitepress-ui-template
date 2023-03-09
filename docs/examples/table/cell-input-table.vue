<template>
  <el-table
    :data="tableData"
    border
    style="width: 100%"
    @cell-click="handleCellClick"
  >
    <el-table-column prop="date" label="Date" width="180" />
    <el-table-column prop="name" label="Name" width="180">
      <template #default="{ row }">
        <div v-if="!row._isShowInput">{{ row.name }}</div>
        <el-input
          v-else
          v-model="row.name"
          size="small"
          placeholder="请输入"
          @blur="handleCellInputBlur(row)"
        />
      </template>
    </el-table-column>
    <el-table-column prop="address" label="Address" />
  </el-table>
</template>

<script lang="ts" setup>
import { nextTick } from 'vue'
const tableData = [
  { date: '2016-05-03', name: 'Tom', address: 'No. 189, Grove St, Los Angeles', },
  { date: '2016-05-02', name: 'Tom', address: 'No. 189, Grove St, Los Angeles', },
  { date: '2016-05-04', name: 'Tom', address: 'No. 189, Grove St, Los Angeles', },
  { date: '2016-05-01', name: 'Tom', address: 'No. 189, Grove St, Los Angeles', },
]

const handleCellClick = (row, column, cell) => {
  if(column.property === 'name') {
    row._isShowInput = true
    nextTick(() => {
      cell.querySelector('.el-input__inner').focus()
    })
  }
}

const handleCellInputBlur = (row) => {
  row._isShowInput = false
}
</script>
