<template>
  <div>
    <div v-if="stage==='data'">content</div>
    <result-page
      v-else
      :apiResultList.sync="apiResultList"
      @retry="retry"
      @retryAll="retryAll"
      @success="handleSuccessResult"
      @close="handleCloseResult"
    >
      <!--    <template v-slot:successBtn0="{ content }">-->
      <!--      <el-button-->
      <!--        type="text"-->
      <!--        size="small"-->
      <!--        @click="toDetail(content)"-->
      <!--        v-if="showPermission('permission_commodityRules_view')"-->
      <!--        >查看商品规则详情</el-button-->
      <!--      >-->
      <!--    </template>-->
    </result-page>
  </div>
</template>

<script>
import ResultPage from '@/resource-view/components/resultPage/index'
export default {
  components: {
    ResultPage,
  },
  data() {
    return {
      apiResultList: [],
      stage: 'data'
    }
  },
  methods: {
    submit() {
      this.stage = 'request'
      let params = {}
      this.fetchResult(params)
    },
    // 单个接口, 处理业务处
    async fetchResult(params) {
      this.apiResultList = [
        {
          status: 'loading',
          operation: {
            loading: `xxx添加中`,
            success: `xxx添加成功`,
            fail: `xxx添加失败`,
          },
          content: {
            id: '',
            // detail: `<span>用户名称：${params.userName}</span>`,
          },
        },
      ]
      try {
        const r = await api(params)
        // TODO ......
        this.apiResultList[0].content.detail = `<div><div style='margin-bottom: 10px'>ID：</div><div>xxx：${r}</div></div>`
        this.apiResultList[0].status = 'success'
      } catch(err) {
        console.log(err)
        this.apiResultList[0].status = 'fail'
        this.apiResultList[0].content.failReason = err.message
      }
    },
    // 重试
    retry() {
      this.fetchResult()
    },
    // 全部重试， 这里只是重新请求错误的接口,
    retryAll() {
      this.fetchResult()
    },
    handleSuccessResult() {
      this.$router.go(-1)
    },
    handleCloseResult() {
      this.stage = 'data'
      this.apiResultList = []
    },
  }
}
</script>