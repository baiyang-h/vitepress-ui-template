import {
  salesTaskAutoCreateRuleDetail,
  distributorCategoryTree,
} from '@/api/service/task'

import {
  transformCategoryTree,
  findInvalidItemList,
  flatMixinTree,
} from '@/components/jwCascaderPanel/mixin/utils'
import { isEmpty } from '@/utils'

function dataAdapter(data) {
  if (isEmpty(data)) {
    this.isEmpty = true

    return {
      categoryRule: [],
      businessRule: [],
      defaultRule: {},
    }
  }

  return {
    categoryRule: data.categoryAutoCreateRules || [],
    businessRule: data.businessAutoCreateRules || [],
    defaultRule: data.defaultAutoCreateRule || {},
  }
}

const mixin = {
  props: {
    type: {
      type: String,
      default: 'action',
    },
  },
  provide() {
    return { instance: this }
  },
  filters: {
    formateEnable(val) {
      return val ? '是' : '否'
    },
  },
  computed: {
    isDetail() {
      return this.type === 'detail'
    },
    /**
     * 展示配置业务按钮
     */
    showConfigBtn() {
      if (this.isDetail) {
        return true
      }
      return false
    },
    treeMap() {
      if (this.categoryTree.length) {
        return flatMixinTree(this.categoryTree)
      }
      return { business: {}, category: {} }
    },
    defaultFormDetail() {
      if (this.defaultForm) {
        return this.formatFormDetail(this.defaultForm)
      }
      return ''
    },
    formDetail() {
      if (this.form) {
        return this.formatFormDetail(this.form)
      }
      return ''
    },
  },
  created() {
    this.getTreeData()
  },
  methods: {
    // 当是查看详情（外层表单），或者 列表中的表单处于详情（未创建等） 显示的效果时，该方法返回的文本即使展示的详情
    // 因为首页的列表处是展示列表，那里也会使用该混入，只能写在此处，不能放在index.vue处。
    formatFormDetail(data) {
      const detail = [
        { text: '交付信息更新', value: data.aaaaaaaa },
        { text: '售后信息更新', value: data.bbbbbbbb },
        { text: '服务单信息更新', value: data.cccccccc },
      ]

      return detail
        .filter((item) => item.value)
        .map((item) => item.text)
        .join('、')
    },
    // 获取初始化配置数据，如 编辑页面初始化的数据
    async getDetail() {
      const { data } = await salesTaskAutoCreateRuleDetail()
      const response = dataAdapter.call(this, data)

      this.$store.dispatch('user/calculateAnchorList', this.$route)
      return response
    },
    // 获取规则列表树 数据
    async getTree() {
      const { data } = await distributorCategoryTree()
      return data
    },
    async getTreeData() {
      // 拿到的列表树数据可以查看 data.js 中的 data2 数据
      const categoryTree = await this.getTree()
      // 拿到的需要初始化回显的数据可以查看 data.js 中的 data1 数据
      const data = await this.getDetail()

      this.categoryData = data
      this.defaultForm = data.defaultRule

      this.$nextTick(() => {
        // 这里是将拿到的树数据初始化格式成你想要的类型，比如第一级是业务列表，子集开始才是分类列表，这里做处理，比如增加children字段或者新增别的字段等
        this.formatCategoryOptions({
          categoryTree: transformCategoryTree(categoryTree),
        })

        // 这里是无效列表  1. 这里是直接用方法来提取， 2. 有些模块我看到也有直接通过接口拿到数据的，
        this.invalidItemList = findInvalidItemList(this.treeMap, {
          category: this.categoryMap,
          business: this.businessMap,
        })
      })
    },
  },
}

export default mixin
