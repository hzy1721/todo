import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import 'normalize.css/normalize.css'

import '@/styles/tab_content.scss'
import '@/styles/menu.scss'

import 'element-plus/dist/index.css'

import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const themeModules = import.meta.globEager('@/styles/theme/*.scss')

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(ElementPlus, {
  locale: zhCn,
})

app.mount('#app')
