/**
 * create by haojie.Li
 * Data: 2024/10/15 10:31:00
 * For: 字典手动配置
 */

import { ref } from 'vue'
import { message } from 'ant-design-vue'
import type { IDic } from '../type'

export const useDiction = () => {
  const showDiction = ref(false)

  const dictionData = ref<IDic[]>([])

  const openDiction = (record: any) => {
    showDiction.value = true
    const { options } = record.componentProps
    dictionData.value = JSON.parse(JSON.stringify(options))
  }

  const closeDiction = () => {
    showDiction.value = false
  }

  /**
   * 新增字典
   */
  const addDiction = () => {
    dictionData.value.push({
      value: '',
      label: ''
    })
  }

  /**
   * 取消当列的字典
   * @param record
   */
  const cancelRecordDic = (record: IDic) => {
    dictionData.value = dictionData.value.filter((dic: IDic) => {
      return dic !== record
    })
  }

  /**
   * 检查字典信息是否完整
   */
  const checkDiction = () => {
    let flag = true
    dictionData.value.forEach((dic: IDic) => {
      const { value, label } = dic
      if (!value || !label) {
        flag = false
        message.error('请填入完整字典信息')
      }
    })
    return flag
  }

  return {
    showDiction,
    openDiction,
    closeDiction,
    dictionData,
    addDiction,
    cancelRecordDic,
    checkDiction
  }
}
