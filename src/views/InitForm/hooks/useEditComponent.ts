/**
 * create by haojie.Li
 * Data: 2024/15/29 15:49:36
 * For:
*/
import {ref} from 'vue'

const useEditComponent = () => {
  const activeId = ref('')

  const configData = ref<any>({})

  // 选中某个组件
  const focusComponent = (id:string) => {
    activeId.value = id;
    configData.value = addComponents.value.find((item:any)=> item.id === id)
  }

  const addComponents = ref<any>([])

  return {
    activeId,
    focusComponent,
    addComponents,
    configData
  }

}

export default useEditComponent
