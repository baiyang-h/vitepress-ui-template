<template>
  <basic-container
    title="无效任务自动创建规则"
    v-if="instance.showInvalidItemList"
  >
    <jw-category-panel-invalid
      :list="instance.invalidItemList"
      @click="(data) => (instance.invalidForm = data)"
    >
      <template v-slot:label="{ item }">
        {{ item.businessId || item.categoryId }}
      </template>

      <el-form
        label-width="130px"
        style="width: 350px"
        v-if="instance.invalidForm"
      >
        <div class="jw-category-form__head">
          <h1 class="jw-category-form__title">
            {{ instance.invalidForm.categoryId }}
          </h1>
        </div>

        <el-row v-if="instance.invalidForm">
          <el-form-item label="是否处理:" label-width="75px">
            {{ instance.formatFormDetail(instance.invalidForm) }}
          </el-form-item>
        </el-row>
      </el-form>
    </jw-category-panel-invalid>
    <el-button
      type="primary"
      v-if="!instance.isDetail"
      @click="() => instance.continueConfig()"
    >继续编辑（移除无效任务处理规则）</el-button
    >
  </basic-container>
</template>

<script>
import jwCategoryPanelInvalid from '@/components/jwCategoryPanel/invalidCategory.vue'

export default {
  name: 'RulesInvalid',
  components: { jwCategoryPanelInvalid },
  inject: ['instance'],
}
</script>
