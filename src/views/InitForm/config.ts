export const componentCollection: any = [
  {
    type: 'Input',
    name: '文本输入框',
    icon: 'FontSizeOutlined',
    id: 'Input'
  },
  {
    type: 'Select',
    name: '下拉单选框',
    icon: 'BarChartOutlined',
    id: 'Select'
  }
]

export const inputRuleOptions = [
  {
    value: 0,
    label: '无规则',
    message: '',
    rule: ''
  },
  {
    value: '/^[0-9]+$/',
    label: '纯数字',
    message: '请输入数字',
    rule: /^[0-9]+$/
  }
]

export const triggerOptions = [
  {
    value: 'blur',
    label: '值变化时'
  },
  {
    value: 'change',
    label: '焦点变化'
  }
]

export const dictColumn: any[] = [
  {
    title: '编码',
    dataIndex: 'value',
    ellipsis: true
  },
  {
    title: '描述',
    dataIndex: 'label',
    ellipsis: true
  },
  {
    title: '操作',
    dataIndex: 'actions',
    ellipsis: true
  }
]

export const rulesCompareOptions = [
  {
    value: 'equal',
    label: '等于'
  },
  {
    value: 'max',
    label: '大于'
  },
  {
    value: 'min',
    label: '小于'
  },
  {
    value: 'include',
    label: '包含'
  }
]

export const rulesCompareMap = new Map([
  ['equal', '等于'],
  ['max', '大于'],
  ['min', '小于'],
  ['include', '包含']
])

export const ruleEndTypeOptions = [
  {
    value: 'value',
    label: '值'
  },
  {
    value: 'attribute',
    label: '属性'
  }
]

export const ruleEndTypeMap = new Map([
  ['value', '值'],
  ['attribute', '属性']
])

export const ruleEndTypeOptions2 = [
  {
    value: 'attribute',
    label: '属性'
  }
]

export const attributeTypeOptions = [
  {
    value: 'required',
    label: '必填'
  },
  {
    value: 'hide',
    label: '隐藏'
  },
  {
    value: 'show',
    label: '显示'
  },
  {
    value: 'disabled',
    label: '禁用'
  }
]

export const attributeTypeMap = new Map([
  ['required', '必填'],
  ['hide', '隐藏'],
  ['show', '显示'],
  ['disabled', '禁用']
])
