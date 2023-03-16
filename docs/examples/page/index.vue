<template>
  <div class="page">
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
    <div class="table">
      <el-table
        v-loading="tableLoading"
        :data="tableData"
        max-height="500"
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
  </div>
</template>

<script lang="ts" setup>
import {onMounted, reactive, ref, toRaw} from 'vue'

const formRef = ref(null)
const form = reactive({
  aaa: '',
  bbb: '',
  ccc: null,
  ddd: null,
})

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

// 查询
const handleSearch = () => {
  console.log(toRaw(form))
}
// 重置
const handleReset = () => {
  if (!formRef.value) return
  formRef.value.resetFields()
}

// 分页
const handleSizeChange = (pageSize) => {
  console.log(pageSize)
  page.currentPage = 1
  page.pageSize = pageSize
  fetchList()
}

// 选择页
const handleCurrentChange = (currentPage) => {
  console.log(currentPage)
  page.currentPage = currentPage
  fetchList()
}

// 编辑
const handleEdit = ({ row, $index }) => {
  console.log(row, $index)
}
</script>
<style scoped lang="scss">
.page {
  .search {}
  .table {
    .el-pagination {
      margin-top: 24px;
    }
  }
}
</style>
