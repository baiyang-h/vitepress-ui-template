<template>
  <div>
    <el-table
      v-loading="tableLoading"
      :data="tableData"
      max-height="300"
      style="width: 100%"
    >
      <el-table-column prop="name" label="姓名" width="120"  />
      <el-table-column prop="address" label="地址" />
      <el-table-column prop="date" label="日期" width="150"  />
      <el-table-column fixed="right" label="操作" width="120">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="handleEdit(scope)">编辑</el-button>
          <el-button link type="primary" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="page.currentPage"
      v-model:page-size="page.pageSize"
      :page-sizes="[20, 50, 100, 200]"
      :small="true"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'

const tableData = ref([])
const tableLoading = ref(false)
const page = reactive({
  currentPage: 1,
  pageSize: 20,
  total: 0
})

onMounted(() => {
  fetchList()
})

async function fetchList() {
  try {
    tableLoading.value = true
    let params = {}
    const r = await new Promise(resolve => {
      setTimeout(() => {
        resolve({
          code: 0,
          data: {
            list: [
              { date: '2016-05-01', name: 'Tom', address: 'No. 189, Grove St, Los Angeles',},
              { date: '2016-05-03', name: 'Tom', address: 'No. 189, Grove St, Los Angeles',},
              { date: '2016-05-02', name: 'Tom', address: 'No. 189, Grove St, Los Angeles',},
            ],
            total: 9999
          },
          message: '成功',
        })
      }, 500)
    })
    tableData.value = r.data.list || []
    page.total = r.data.total
  } catch (e) {
    console.log(e)
  } finally {
    tableLoading.value = false
  }
}

const handleSizeChange = (pageSize) => {
  console.log(pageSize)
  page.currentPage = 1
  page.pageSize = pageSize
  fetchList()
}

const handleCurrentChange = (currentPage) => {
  console.log(currentPage)
  page.currentPage = currentPage
  fetchList()
}

const handleEdit = ({ row, $index }) => {
  console.log(row, $index)
}
</script>

<style scoped>
.el-pagination {
  margin-top: 24px;
}
</style>
