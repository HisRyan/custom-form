<script setup lang="ts">
import { PropType, toRefs } from 'vue'
import { attributeTypeMap, ruleEndTypeMap, rulesCompareMap } from '@/views/InitForm/config'

const props = defineProps({
  rules: {
    type: Array as PropType<Array<any>>,
    required: true
  }
})

const { rules } = toRefs(props)
</script>

<template>
  <a-collapse>
    <a-collapse-panel v-for="(item, index) of rules" :key="index" :title="`联动规则${index}`">
      <div class="flex w-full mb-4">
        <div class="w-1/3 text-center">{{ item.label }}</div>
        <div class="w-1/3 text-center">{{ rulesCompareMap.get(item.comparison) }}</div>
        <div class="w-1/3 text-center">{{ item.value }}</div>
      </div>
      <div class="flex w-full">
        <div class="w-1/3 text-center">{{ item.result.resultLabel }}</div>
        <div class="w-1/3 text-center">{{ ruleEndTypeMap.get(item.result.targetType) }}</div>
        <div v-if="item.result.targetType === 'attribute'" class="w-1/3 text-center">
          {{ attributeTypeMap.get(item.result.targetValue) }}
        </div>
        <div v-else class="w-1/3 text-center">
          {{ item.result.targetValue }}
        </div>
      </div>
    </a-collapse-panel>
  </a-collapse>
</template>

<style scoped lang="less"></style>
