<script setup lang="ts">
import { ref } from 'vue'
import { useDraggable } from 'vue-draggable-plus'
import ComponentTaps from './components/ComponentTaps.vue'
import FormConfig from './components/FormConfig.vue'
import { componentCollection } from './config'
import { generateRandomString } from '../../utils'
import useEditComponent from './hooks/useEditComponent'
import CommonentConfig from './components/CommonentConfig.vue'

const { activeId, focusComponent, addComponents, configData } = useEditComponent()

const list1 = ref(componentCollection)

const el1 = ref()
const el2 = ref()
//@ts-ignore
useDraggable(el1, list1, {
  animation: 150,
  group: {
    name: 'id',
    pull: 'clone',
    put: false
  },
  sort: false,
  clone(element: any) {
    const id = generateRandomString(10)
    activeId.value = id
    console.log(addComponents.value)
    console.log(element)
    // 文本框
    return {
      label: element.name + '_' + id,
      field: id,
      id,
      component: element.type,
      required: false,
      defaultValue: null,
      isHide: false,
      disabled: false,
      trigger: 'blur',
      rules: {},
      componentProps: {
        options: []
      }
    }
  }
})
//@ts-ignore
useDraggable(el2, addComponents, {
  animation: 150,
  group: 'id'
})
</script>

<template>
  <div class="flex main">
    <component-taps ref="el1" class="flex flex-col gap-2 p-4 w-300px bg-gray-500/5 rounded" />
    <div class="form-show relative">
      <form-config :formData="addComponents" />
      <div class="w-full h-full" ref="el2">
        <div
          v-for="item in addComponents"
          :key="item.id"
          class="cursor-move form-main-item"
          :class="activeId === item.id ? 'form-main-item-active' : ''"
          @click="focusComponent(item.id)"
        >
          <template v-if="item.component === 'Input'">
            <div class="">
              <a-form-item :label="item.label">
                <a-input style="width: 160px" placeholder="请输入"></a-input>
              </a-form-item>
            </div>
          </template>
          <template v-if="item.component === 'Select'">
            <div>
              <a-form-item :label="item.label">
                <a-select
                  style="width: 160px"
                  placeholder="请选择"
                  :options="item.options"
                ></a-select>
              </a-form-item>
            </div>
          </template>
        </div>
      </div>
    </div>

    <commonent-config :config-data="configData"></commonent-config>
  </div>
</template>

<style lang="less" scoped>
.main {
  width: 100%;
  height: 100%;
  display: flex;
  .form-show {
    padding-top: 70px;
    padding-left: 50px;
    //background-color: rgb(52, 80, 106);
    flex: 1;
    .form-main-item {
      //margin-top: 20px;
      margin-bottom: 10px;
      box-sizing: border-box;
      width: 50%;
      padding: 10px;
      background: rgb(239, 243, 255);
      border: 1px solid transparent;
      border-radius: 5px;
      height: 55px;
    }
    .form-main-item-active {
      border: 1px solid #3370ff;
    }
  }
}
</style>
