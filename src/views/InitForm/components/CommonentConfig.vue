<script setup lang="ts">
import { toRefs, watch, ref } from 'vue'
import { PlusCircleOutlined, FormOutlined } from '@ant-design/icons-vue'
import { dictColumn, inputRuleOptions, triggerOptions } from '@/views/InitForm/config'
import { useDiction } from '../hooks/useDiction'

const props = defineProps({
  configData: {
    type: Object,
    required: true
  }
})

const { configData } = toRefs(props)

const {
  openDiction,
  closeDiction,
  showDiction,
  dictionData,
  addDiction,
  cancelRecordDic,
  checkDiction
} = useDiction()

const addOptions = () => {
  configData?.value.options.push({
    value: 1,
    lavbel: '2'
  })
}

const rulesConfig = ref<any>()

const changeRule = (value: any, option: any) => {
  console.log(option)
  configData.value.rules = {
    pattern: option.rule,
    message: option.message
  }
}

// 保存某一字段的字典
const hanleSaveDiction = () => {
  const flag = checkDiction()
  if (!flag) return
  configData.value.componentProps.options = dictionData.value
  showDiction.value = false
}

watch(
  () => props.configData,
  (val: any) => {
    const { rules } = val
    if (JSON.stringify(rules) === '{}') {
      rulesConfig.value = 0 // 如果为空,返回false
    } else {
      rulesConfig.value = rules
    }
  }
)
</script>

<template>
  <div class="root_component">
    <div v-if="configData.id">
      <div class="flex mb-4 border_bottom">
        <div>控件标识:</div>
        <div>{{ configData.id }}</div>
      </div>
      <div class="border_bottom">
        <a-form-item label="字段名">
          <a-input v-model:value="configData.field"></a-input>
        </a-form-item>
      </div>
      <div class="border_bottom">
        <a-form-item label="标题">
          <a-input v-model:value="configData.label"></a-input>
        </a-form-item>
      </div>

      <div v-if="configData.component === 'Select'" class="border_bottom mb-4">
        <div class="text-[#3370ff] cursor-pointer flex items-center">
          <form-outlined />
          <span class="ml-2" @click="openDiction(configData)">配置下拉字典</span>
        </div>
      </div>
      <div class="border_bottom">
        <a-form-item label="是否必填">
          <a-checkbox v-model:checked="configData.required"></a-checkbox>
        </a-form-item>
      </div>
      <div class="border_bottom">
        <a-form-item label="是否隐藏">
          <a-checkbox v-model:checked="configData.isHide"></a-checkbox>
        </a-form-item>
      </div>
      <div class="border_bottom">
        <a-form-item label="是否禁用">
          <a-checkbox v-model:checked="configData.disabled"></a-checkbox>
        </a-form-item>
      </div>
      <div class="border_bottom">
        <a-form-item v-if="configData.component === 'Select'" label="默认值">
          <a-select
            v-model:value="configData.defaultValue"
            placeholder="请选择默认值"
            :options="configData.componentProps.options"
          ></a-select>
        </a-form-item>
        <a-form-item v-else label="默认值">
          <a-input v-model:value="configData.defaultValue" placeholder="请输入默认值"></a-input>
        </a-form-item>
      </div>
      <div class="border_bottom">
        <a-form-item label="输入规则">
          <a-select
            v-model:value="rulesConfig"
            :options="inputRuleOptions"
            @change="changeRule"
            placeholder="请选择规则"
          ></a-select>
        </a-form-item>
      </div>
      <div class="border_bottom">
        <a-form-item label="校验时机">
          <a-select v-model:value="configData.trigger" :options="triggerOptions"></a-select>
        </a-form-item>
      </div>

      <div v-if="configData?.type === 'select'" class="mb-4 border_bottom">
        <div class="mb-2">下拉选项:</div>
        <div v-for="(item, index) of configData?.options" :key="index">
          {{ item.value }}
        </div>
        <div class="flex items-center">
          <plus-circle-outlined style="color: #3370ff; margin-right: 8px" @click="addOptions" />
          添加选项
        </div>
      </div>
    </div>
    <a-modal title="字典配置" :visible="showDiction" @cancel="closeDiction" @ok="hanleSaveDiction">
      <div class="mb-4 flex flex-row-reverse">
        <a-button type="primary" @click="addDiction">新增</a-button>
      </div>
      <a-table :columns="dictColumn" :data-source="dictionData" :pagination="false">
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'value'">
            <a-input
              placeholder="请输入编码"
              v-model:value="record.value"
              :maxlength="20"
            ></a-input>
          </template>
          <template v-if="column.dataIndex === 'label'">
            <a-input
              placeholder="请输入描述"
              v-model:value="record.label"
              :maxlength="20"
            ></a-input>
          </template>
          <template v-if="column.dataIndex === 'actions'">
            <div>
              <a-button type="link" danger @click="cancelRecordDic(record)"> 删除 </a-button>
            </div>
          </template>
        </template>
      </a-table>
    </a-modal>
  </div>
</template>

<style scoped lang="less">
.root_component {
  height: 100%;
  width: 300px;
  padding: 20px;
  //background-color: #242a30;
  border: 1px solid #ccc;
  .border_bottom {
    //border-bottom: 1px solid #ccc;
    //padding-bottom: 8px;
  }
}
</style>
