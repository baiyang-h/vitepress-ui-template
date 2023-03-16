<template>
  <div>
    <div v-if="stage">content</div>
    <result-page
      v-else
      :apiResultList.sync="apiResultList"
      @retry="retry"
      @retryAll="retryAll"
      @success="handleSuccessResult"
      @close="handleCloseResult"
      :isCountDown="false"
    />
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
      this._list = [] // 需要被批量执行的数据
      this.handleRequest()
    },
    // 批量处理结果页
    handleRequest() {
      this.callbacks = []
      this._list.forEach((item, index) => {
        // 这步是关键， 存储的必须是一个 函数。 至于业务都在 fetchData 內部做就行
        this.callbacks.push(() => this.fetchData(item, index))
      })
      this.sequentialFetchList(this.callbacks)
    },
    // 批量提交  step 为步长，几个一批， 默认5个
    async sequentialFetchList(callbacks, step=5) {
      const len = callbacks.length
      let index = 0
      let allSettled = []
      while(index<len) {
        allSettled.push(callbacks.slice(index, index+step))
        index += step
      }
      for(let callbacks of allSettled) {
        await Promise.allSettled(callbacks.map(item => item()))
      }
    },
    // 单个接口, 处理业务处
    async fetchData(item, index) {
      this.$set(this.apiResultList, index, {
        status: 'loading',
        operation: {
          loading: `xxx添加中`,
          success: `xxx添加成功`,
          fail: `xxx添加失败`,
        },
        content: {
          id: '',
          detail: ``,
          __index: index,
        },
      })
      try {
        let params = {}
        const r = await api(params)
        // TODO ......
        this.apiResultList[index].content.detail = `<div><div style='margin-bottom: 10px'>ID：</div><div>xxx：</div></div>`
        this.apiResultList[index].status = 'success'
      } catch(err) {
        console.log(err)
        this.apiResultList[index].status = 'fail'
        this.apiResultList[index].content.failReason = err.message
      }
    },
    // 重试
    retry({ index }) {
      this.fetchData(this._list[index], index)
    },
    // 全部重试， 这里只是重新请求错误的接口,
    retryAll(loadingApiList) {
      // 可 this.handleRequest()   全部重试，但是成功的也会执行， 测试需要的是错误的批量执行/ 也分几个一组.   这里的__index 就是当前这个错误的它的索引，找到相应的重新请求
      this.sequentialFetchList(
        loadingApiList.map(
          (item) => () =>
            this.fetchData(this._list[item.content.__index], item.content.__index)
        )
      )
    },
    handleSuccessResult() {
      this.$router.go(-1)
    },
    handleCloseResult() {
      this.stage = 'data'
      this.apiResultList = []
      this.callbacks = []
      this._list = []
    },
  }
}
</script>