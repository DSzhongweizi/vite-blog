import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import { createRouter, createWebHistory } from 'vue-router'

import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'

import App from './App.vue'

const routes = setupLayouts(generatedRoutes)
const router = createRouter({
  history: createWebHistory(),
  routes,
})

// import VueCode from './components/global/VueCode.vue'

const head = createHead() // <--
const app = createApp(App)
// 全局注册组件
// app.component('VueCode', VueCode) // 必须的
app.use(head).use(router).mount('#app')
