<script setup lang="ts">
import { useForm, KtForm } from 'kt-ui'
import type { PropType } from 'vue'
import { toRefs, computed } from 'vue'
import type { ISchemas } from 'kt-ui'

const props = defineProps({
  formData: {
    type: Array as PropType<Array<ISchemas>>,
    required: true
  },
  formRules: {
    type: Array
  }
})

const { formData, formRules } = toRefs(props)

const createwhen = (field: string, fun: any) => {
  return computed<any>(() => when(field, fun))
}

const createExcept = (field: string, fun: any) => {
  return computed<any>(() => !when(field, fun))
}

console.log('formData', formData?.value)

const getCompareFun = (type: string, value: any) => {
  if (type === 'equal') {
    return (val: any) => val === value
  } else if (type === 'max') {
    return (val: any) => val > value
  } else if (type === 'min') {
    return (val: any) => val < value
  }
}

const initSchemas = () => {
  formData.value.forEach((item: any) => {
    formRules?.value?.forEach((rule: any) => {
      if (rule.result.targetType === 'attribute' && rule.result.targetField === item.field) {
        if (rule.result.targetValue === 'required') {
          console.log('rule.label', getCompareFun(rule.comparison, rule.value))
          item.required = createwhen(rule.field, getCompareFun(rule.comparison, rule.value))
        }
        if (rule.result.targetValue === 'show') {
          item.isHide = createExcept(rule.field, getCompareFun(rule.comparison, rule.value))
        }
        if (rule.result.targetValue === 'hide') {
          item.isHide = createwhen(rule.field, getCompareFun(rule.comparison, rule.value))
        }
      }
    })
  })
}

initSchemas()

console.log('formData.value', formData.value)

const { initForm, methods, when } = useForm({ schemas: formData?.value, labelCol: { span: 6 } })

const { submit } = methods

const getForm = async () => {
  try {
    const res = await submit()
    console.log(res)
  } catch (e) {
    console.log(e)
  }
}
</script>

<template>
  <div class="main">
    <KtForm @initForm="initForm" />
    <a-button type="primary" @click="getForm">获取表单值</a-button>
  </div>
</template>

<style scoped lang="less">
.main {
  padding: 30px;
}
</style>
