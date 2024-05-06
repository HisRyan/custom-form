import 'kt-ui/dist/style.css'
import '@/style/index.less'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import {
  Button,
  Form,
  Input,
  Popconfirm,
  InputNumber,
  Tabs,
  Select,
  Modal,
  Checkbox,
  ConfigProvider,
  Table,
  Collapse,
  CollapsePanel
} from 'ant-design-vue'
// import '@/views/bigScreen/style/index.less'
import { FontSizeOutlined, PieChartOutlined, BarChartOutlined } from '@ant-design/icons-vue'

import App from './App.vue'
import router from './router'

const plugins: any = {
  router,
  Button,
  Form,
  Input,
  Popconfirm,
  InputNumber,
  Tabs,
  Select,
  Modal,
  Checkbox,
  ConfigProvider,
  Table,
  Collapse,
  CollapsePanel
}
const globalAntdIcons: any[] = [FontSizeOutlined, PieChartOutlined, BarChartOutlined]

const app = createApp(App)

globalAntdIcons.forEach((comp: any) => {
  app.component(comp.displayName || comp.name, comp)
})

Object.keys(plugins).forEach((key) => {
  app.use(plugins[key])
})

Object.keys(plugins).forEach((key) => {
  app.use(plugins[key])
})
app.directive('rightClick', {
  mounted(el, binding) {
    const handler = (event: any) => {
      if (event.button === 2) {
        event.preventDefault() // 阻止默认右键菜单
        binding.value(event) // 执行绑定的方法
      }
    }
    el.addEventListener('contextmenu', handler)
    el._rightClickHandler = handler
  },
  beforeUnmount(el) {
    el.removeEventListener('contextmenu', el._rightClickHandler)
    delete el._rightClickHandler
  }
})
//@ts-ignore
// install.install(app)

app.use(createPinia())

app.mount('#app')

// document.oncontextmenu = (e) => {
//   e.preventDefault()
// }
