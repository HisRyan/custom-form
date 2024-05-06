<script setup lang="ts">
import {componentCollection} from '../config'

</script>

<template>
  <div class="root_component">
    <div
        v-for="item in componentCollection"
        :key="item.type"
        class="tab-item"
        draggable="true"
    >
      <component :is="item.icon" style="font-size: 18px; color: #409eff" />
      <span class="name_panel">
        {{ item.name }}
      </span>
    </div>
  </div>
</template>

<style scoped lang="less">
.root_component {
  height: 100%;
  min-width: 200px;
  padding: 20px;
  background-color: #242a30;
  .tab-item {
    color: white;
    background-color: rgb(52, 80, 106);
    padding: 10px;
    cursor: pointer;
    margin-bottom: 20px;
  }
  .name_panel {
    margin-left: 10px;
  }
}
</style>
