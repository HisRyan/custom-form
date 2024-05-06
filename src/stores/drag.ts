import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IComponentData } from '@/views/bigScreen/types'

export const useDragStore = defineStore('counter', () => {
  const dragStatus = ref(true)

  const dragAllDatas = ref<IComponentData[]>([])

  function setDragStatus(status: boolean) {
    dragStatus.value = status
  }

  return { dragStatus, setDragStatus }
})
