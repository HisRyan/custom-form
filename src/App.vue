<script setup lang="ts">
import { ref } from 'vue'
import zh_CN from 'ant-design-vue/es/locale/zh_CN'

const locale = ref(zh_CN)
</script>

<template>
  <a-config-provider :locale="locale">
    <router-view></router-view>
  </a-config-provider>
</template>

<style lang="less">
#app {
  height: 100%;
}
</style>
