import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import * as ElementPlusIcons from '@element-plus/icons-vue'
import Avue from '@smallwei/avue'
import '@smallwei/avue/lib/index.css'

import App from './App.vue'
import router from './router'
import { install as installComponents } from '@daas-fe/components'

const app = createApp(App)

// Pinia
app.use(createPinia())

// Router
app.use(router)

// Element Plus
for (const [key, component] of Object.entries(ElementPlusIcons)) {
  app.component(key, component)
}
app.use(ElementPlus, { locale: zhCn })

// Avue
app.use(Avue)

// Daas-fe components
app.use(installComponents)

app.mount('#app')