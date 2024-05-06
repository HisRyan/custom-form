<script setup lang="ts">
import { toRefs, ref } from 'vue'
import {
  ruleEndTypeOptions,
  rulesCompareOptions,
  ruleEndTypeOptions2,
  attributeTypeOptions
} from '@/views/InitForm/config'
import RuleConfigShow from './RuleConfigShow.vue'

const props = defineProps({
  formData: {
    type: Array
  }
})
const { formData } = toRefs(props)

const schemas = ref<any>(props.formData)

const ruleEndTypeOptionsGroup = ref<any>([])

const formRules = ref<any[]>([])

const showModal = ref(false)

const openModal = () => {
  showModal.value = true
}

const close = () => {
  showModal.value = false
}

const saveConfig = () => {
  showModal.value = false
  console.log(rulesConfig.value)

  formRules.value.push(rulesConfig.value)
  rulesConfig.value = {
    label: '',
    field: null,
    comparison: 'equal',
    valueType: 'custom',
    value: null,
    result: {
      resultLabel: '',
      targetField: null,
      targetType: null,
      targetValue: null
    }
  }
}

const filedValueConfig = ref({
  id: '',
  type: '',
  options: []
})

const resultFiledValueConfig = ref({
  id: '',
  type: '',
  options: []
})

const chooseField = (value: any, options: any) => {
  rulesConfig.value.value = null
  filedValueConfig.value.type = options.component
  filedValueConfig.value.options = options.componentProps.options
  filedValueConfig.value.id = options.id
  rulesConfig.value.label = options.label
  rulesConfig.value.result = {
    resultLabel: '',
    targetField: null,
    targetType: null,
    targetValue: null
  }
}

// 切换结果字段，如果结果字段和起始字段一样 更改的只能是属性，不能更改值
const chooseResultField = (value: any, options: any) => {
  if (value === filedValueConfig.value.id) {
    ruleEndTypeOptionsGroup.value = ruleEndTypeOptions2
  } else {
    ruleEndTypeOptionsGroup.value = ruleEndTypeOptions
  }
  rulesConfig.value.result.resultLabel = options.label
  resultFiledValueConfig.value.type = options.component
  resultFiledValueConfig.value.options = options.componentProps.options
  resultFiledValueConfig.value.id = options.id
  rulesConfig.value.result.targetValue = null
}
const rulesConfig = ref({
  title: '',
  label: '',
  field: null,
  comparison: 'equal',
  valueType: 'custom',
  value: null,
  result: {
    resultLabel: '',
    targetField: null,
    targetType: null,
    targetValue: null
  }
})

defineExpose({ formRules })
</script>

<template>
  <div>
    <a-button class="mb-4" type="primary" @click="openModal">新增联动</a-button>
    <rule-config-show v-if="formRules.length" :rules="formRules" />
    <a-modal
      title="表单逻辑配置"
      :visible="showModal"
      width="800px"
      @cancel="close"
      @ok="saveConfig"
    >
      <div>
        <a-form-item label="联动信息" layout="vertical">
          <a-textarea v-model:value="rulesConfig.title"></a-textarea>
        </a-form-item>
      </div>
      <div class="mb-2">当:</div>
      <div class="flex mb-8">
        <div class="mr-4">
          <a-select
            :options="schemas"
            v-model:value="rulesConfig.field"
            @change="chooseField"
            :fieldNames="{ label: 'label', value: 'field' }"
            style="width: 160px"
          ></a-select>
        </div>
        <div class="mr-4">
          <a-select
            v-model:value="rulesConfig.comparison"
            :options="rulesCompareOptions"
            style="width: 160px"
          ></a-select>
        </div>
        <div>
          <a-select
            v-if="filedValueConfig.type === 'Select'"
            v-model:value="rulesConfig.value"
            :options="filedValueConfig.options"
            style="width: 160px"
          ></a-select>
          <a-input v-else v-model:value="rulesConfig.value" style="width: 160px"></a-input>
        </div>
      </div>
      <div class="mb-2">使:</div>
      <div class="flex">
        <div class="mr-4">
          <a-select
            v-model:value="rulesConfig.result.targetField"
            :options="schemas"
            @change="chooseResultField"
            :fieldNames="{ label: 'label', value: 'field' }"
            style="width: 160px"
          ></a-select>
        </div>
        <div class="mr-4">
          <a-select
            v-model:value="rulesConfig.result.targetType"
            :options="ruleEndTypeOptionsGroup"
            style="width: 160px"
          ></a-select>
        </div>
        <div>
          <a-select
            v-if="rulesConfig.result.targetType === 'attribute'"
            :options="attributeTypeOptions"
            v-model:value="rulesConfig.result.targetValue"
            style="width: 160px"
          ></a-select>
          <a-select
            v-else-if="resultFiledValueConfig.type === 'Select'"
            :options="resultFiledValueConfig.options"
            v-model:value="rulesConfig.result.targetValue"
            style="width: 160px"
          ></a-select>
          <a-input
            v-else
            v-model:value="rulesConfig.result.targetValue"
            style="width: 160px"
          ></a-input>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<style scoped lang="less"></style>
