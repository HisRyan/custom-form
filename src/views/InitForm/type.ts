export interface ISchemas {
  // 字段label
  label: string

  // 字段名
  field: string

  // 组件名
  component: any

  // 默认值
  defaultValue?: any

  // 自定义placeholder
  placeholder?: string

  // 是否必填
  required?: any

  // 验证规则
  rules?: any

  // 是否隐藏
  isHide?: any

  // 校验时机
  trigger?: 'blur' | 'change' | ['change', 'blur']

  // 是否禁用
  disabled?: any

  // 组件参数
  componentProps?: any

  // tip提示
  tips?: any

  // tip样式
  tipsStyle?: Object

  // 是否是插槽
  isSlots?: boolean

  // 插槽是否是独立表单
  isOtherSlots?: boolean
}

export interface IDic {
  value: string
  label: string
  isAdd?: boolean
}
