<script setup lang="ts">
import { toRefs, ref } from 'vue'
import PreviewForm from './PreviewForm.vue'
import RuleConfig from './RuleConfig.vue'

const props = defineProps({
  formData: {
    type: Array
  }
})

const { formData } = toRefs(props)

const previewData = ref<any>(formData)

const previewShow = ref(false)

const formRules = ref<any[]>([])

const openPreview = () => {
  if (ruleModal.value) {
    formRules.value = ruleModal.value.formRules
  }
  previewShow.value = true
}

const ruleConfigShow = ref(false)

const openRuleConfig = () => {
  ruleConfigShow.value = true
}

const ruleModal = ref()
</script>

<template>
  <div class="flex absolute top-0 p-2 right-0 flex-row-reverse config_main">
    <div>
      <a-button class="mr-4" type="primary" @click="openPreview">预览</a-button>
      <a-button type="primary" @click="openRuleConfig">联动配置</a-button>
    </div>
  </div>
  <a-modal
    title="预览表单"
    @cancel="previewShow = false"
    :visible="previewShow"
    destroy-on-close
    width="800px"
    :footer="null"
  >
    <preview-form :form-data="previewData" :form-rules="formRules"></preview-form>
  </a-modal>

  <a-modal
    title="联动配置"
    @cancel="ruleConfigShow = false"
    :visible="ruleConfigShow"
    width="800px"
    :footer="null"
  >
    <rule-config ref="ruleModal" :form-data="previewData"></rule-config>
  </a-modal>
</template>

<style scoped lang="less">
.config_main {
  border-bottom: 1px solid #ccc;
  width: 100%;
}
</style>
