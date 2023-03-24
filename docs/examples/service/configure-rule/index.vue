<template>
  <div>
    <rules-invalid v-if="!isDetail" />

    <basic-container :title="title">
      <el-button
        type="primary"
        @click="$router.push({ name: 'salesTaskAutoCreateRules' })"
        v-if="
          showConfigBtn &&
          showPermission({
            key: 'permission_task_config_auto_sale',
            id: '*',
          })
        "
      >配置销售任务自动创建规则</el-button>

      <el-form
        :model="defaultForm"
        :rules="defaultFormRule"
        :disabled="disabledDefaultForm"
        :validate-on-rule-change="false"
        label-suffix=":"
        size="small"
        ref="defaultForm"
        label-width="130px"
        style="margin-top: 15px"
      >
        <el-form-item label="是否创建默认规则">
          <template v-if="isDetail">
            {{ createDefault | formateEnable }}
          </template>
          <el-switch
            v-model="createDefault"
            active-text="是"
            off-text="否"
            @change="createDefaultChange"
            v-else
          />
        </el-form-item>
        <el-form-item label="自动创建任务节点" v-if="createDefault">
          <div v-if="isDetail">
            {{ defaultFormDetail }}
          </div>
          <div v-else>
            <el-checkbox v-model="defaultForm.aaaaaaaa"
            >交付信息更新</el-checkbox
            >
            <el-checkbox v-model="defaultForm.bbbbbbbb"
            >售后信息更新</el-checkbox
            >
            <el-checkbox v-model="defaultForm.cccccccc"
            >服务单信息更新</el-checkbox
            >
          </div>
        </el-form-item>
      </el-form>

      <jw-category-panel
        :filterable="(data) => data.index > 0"
        :options="categoryTree"
        :props="{ label: 'name' }"
        :disabledFilterable="disabledFilterable"
        @clickItem="categoryPaneClick"
      >
        <el-form
          ref="form"
          :model="form"
          :disabled="disabledForm"
          :rules="formRule"
          :validate-on-rule-change="false"
          label-suffix=":"
          size="small"
          label-width="130px"
          style="width: 450px"
          class="jw-category-form"
        >
          <div class="jw-category-form__head">
            <h1 class="jw-category-form__title">
              {{ currentCategory.name }}
            </h1>
            <el-button type="primary" v-if="showCreateButton" @click="create()"
            >创建</el-button
            >
          </div>

          <el-row v-if="showForm">
            <el-form-item label="自动创建任务节点" v-if="form">
              <div v-if="showFormDetail">
                {{ formDetail }}
              </div>
              <div v-else>
                <el-checkbox v-model="form.aaaaaaaa"
                >交付信息更新</el-checkbox
                >
                <el-checkbox v-model="form.bbbbbbbb"
                >售后信息更新</el-checkbox
                >
                <el-checkbox v-model="form.cccccccc"
                >服务单信息更新</el-checkbox
                >
              </div>
            </el-form-item>
          </el-row>

          <el-row>
            <el-form-item label-width="72px" v-if="showExtend">
              <template #label>
                继承自<el-popover
                placement="top-start"
                trigger="hover"
                width="300"
                :content="extendText.tips"
              >
                <i class="el-icon-question" slot="reference" /> </el-popover
              >:
              </template>
              {{ pathsMap }}
            </el-form-item>
            <p v-else>{{ pathsMap }}</p>
          </el-row>

          <el-row>
            <el-button
              type="danger"
              size="small"
              v-show="showDelButton"
              @click="del()"
            >删除</el-button
            >
          </el-row>
        </el-form>
      </jw-category-panel>

      <el-row
        type="flex"
        justify="center"
        class="task-config__footer"
        v-if="!isDetail"
      >
        <el-button
          :disabled="disabledSubmitButton"
          type="primary"
          @click="submit()"
        >确定</el-button
        >
        <el-button @click="$router.go(-1)">关闭</el-button>
      </el-row>
    </basic-container>
  </div>
</template>

<script>
import jwCategoryPanel from '@/components/jwCategoryPanel'
import RulesInvalid from './invalid.vue'
import jwCascaderPanelMixin from '@/components/jwCascaderPanel/mixin/data'
import dataMixin from './dataMixin'
import { isEmpty } from '@/utils'
import keepAliveMixin from '@/mixins/keepAlive'

/**
 * @description 处理数据为接口需要的参数
 * @param data 列表数据但是处理成 扁平化了
 * @param defaultForm 选择的表单部分数据
 * @returns {{businessCreateRuleReq: *[], categoryCreateRuleReq: *[], defaultCreateRuleReq: {}}}
 */
function buildData(data, defaultForm) {
  const result = {
    businessCreateRuleReq: [],
    categoryCreateRuleReq: [],
  }

  result.defaultCreateRuleReq = isEmpty(defaultForm)
    ? null
    : defaultForm

  data.forEach((item) => {
    if (item.business) {
      result.businessCreateRuleReq.push(item.business)
    } else {
      result.categoryCreateRuleReq.push(item.category)
    }
  })

  return result
}

export default {
  name: 'CreateConfigureRule',
  mixins: [jwCascaderPanelMixin, dataMixin, keepAliveMixin],
  components: {
    jwCategoryPanel,
    RulesInvalid,
  },
  data() {
    return {
      isEmpty: false,
      labelKey: 'name',
      title: '销售任务自动创建规则',
      extendText: {
        default: '默认销售任务自动规则',
        empty: '当前分类暂无销售任务自动规则',
        tips: '若当前分类未创建任务规则，则在分类路径上逐级向上寻找创建了任务规则的分类，并继承其规则；若无上级分类创建任务规则，则继承自业务创建的任务规则，若业务未创建任务规则，则继承自默认任务规则',
      },
    }
  },
  activated() {
    /**
     * 如果来自结果页且需要刷新即刷新
     */
    if (this.refreshView && this.fromResulted) {
      this.update()
    }
  },
  updated() {
    this.$store.dispatch('user/calculateAnchorList', this.$route)
  },
  computed: {
    // 列表中的表单规则
    formRule() {
      if (this.isDetail) return {}
      if (
        this.currentCategory.isExtendParent ||
        this.currentCategory.isExtendDefault
      )
        return {}

      return this.createRule()
    },
    // 模块顶层的表单规则
    defaultFormRule() {
      if (this.isDetail) return {}
      if (this.createDefault) return this.createRule()

      return {}
    },
  },
  methods: {
    // 这个在jwCascaderPanelMixin混入里面有，他用于在点击创建和删除按钮时。整体模块表单灰显 disabled 的问题， 如果你有自定义的规则 可以重写该方法
    // checkIsEmpty(val) {
    //   const values = Object.entries(val)
    //   if (values.some((item) => item[1] === undefined)) {
    //     return true
    //   }
    //   return false
    // },
    // 初始化默认表单，我看jwCascaderPanelMixin混入的地方也有用到
    createDefaultForm() {
      return {
        aaaaaaaa: false,
        bbbbbbbb: false,
        cccccccc: false,
      }
    },
    // 创建表单验证规则
    createRule() {
      return {
        aaaaaaaa: [
          { required: true, message: '请选择是否交付信息更新自动创建任务节点' },
        ],
        bbbbbbbb: [
          { required: true, message: '请选择是否售后信息更新自动创建任务节点' },
        ],
        cccccccc: [
          {
            required: true,
            message: '请选择是否服务单信息更新自动创建任务节点',
          },
        ],
      }
    },
    // 点击创建
    create() {
      /**
       * 创建校验用户每一种工单类型下，已创建的工单处理规则不得超过200个
       * 否则提示““具体工单类型”规则不得超过200个”
       */
      if (this.flatCategoryData.length >= 200) {
        this.$message.error('销售任务自动创建规则不得超过200个')
        return
      }

      this.disabledFilterable = true

      this.currentCategory.isExtendDefault = false
      this.currentCategory.isExtendParent = false

      const key = this.currentCategory.businessId ? 'businessId' : 'categoryId'

      this.form = this.createFormFactory(
        key,
        this.currentCategory.value,
        this.createDefaultForm()
      )
      // !将新创建的数据挂到 树上
      this.currentCategory.form = this.form
    },
    // 提交
    submit() {
      if (this.flatCategoryData.length > 200) {
        this.$message.warning('销售任务自动创建规则不得超过200个')
        return
      }

      const params = buildData(this.flatCategoryData, this.defaultForm)

      /******************************** start 这部分可能涉及到一个bug，再原模块中新增需求比如新增一个条件，但是因为原数据库中没有该字段的原因，导致编辑返回的时候没有这个字段，所以提交的时候默认传一个值 ****************************************/
      if (params.categoryCreateRuleReq) {
        params.categoryCreateRuleReq =
          params.categoryCreateRuleReq.map((item) => ({
            cccccccc: false,
            ...item,
          }))
      }
      if (params.businessCreateRuleReq) {
        params.businessCreateRuleReq =
          params.businessCreateRuleReq.map((item) => ({
            cccccccc: false,
            ...item,
          }))
      }
      if (params.defaultCreateRuleReq) {
        params.defaultCreateRuleReq = {
          cccccccc: false,
          ...params.defaultCreateRuleReq,
        }
      }
      /******************************** end ****************************************/

      console.log(params)

      this.$setRequestParams(
        {
          params,
          method: 'salesTaskAutoCreateRuleConfig',
          apiName: 'configSalesTaskAutoCreateResult',
        },
        { name: 'taskResult2' }
      )
    },
    /**
     * 更新数据
     */
    update() {
      this.init = false
      this.categoryTree = []
      this.getTreeData()
    },
  },
}
</script>
