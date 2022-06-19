import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import 'normalize.css/normalize.css'

import '@/styles/tab_content.scss'
import '@/styles/menu.scss'

const themeModules = import.meta.globEager('@/styles/theme/*.scss')

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
