import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import request from './utils/request'
import storage from './utils/localStorage'
import api from './api'

import NutUI from '@nutui/nutui'
import '@nutui/nutui/dist/style.css'

const app = createApp(App)

// 全局挂载接口
app.config.globalProperties.$api = api
// 全局挂载请求
app.config.globalProperties.$request = request
// 全局挂载本地存储
app.config.globalProperties.$storage = storage

app
.use(NutUI)
.use(router)
.mount('#app')
