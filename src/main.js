import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './style.css'

// 路由配置
const routes = [
  { path: '/', component: () => import('./views/Home.vue') },
  { path: '/books', component: () => import('./views/Books.vue') },
  { path: '/little-prince', component: () => import('./views/LittlePrince.vue') },
  { path: '/test', component: () => import('./views/Test.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0, behavior: 'smooth' }
  }
})

const app = createApp(App)
app.use(router)
app.mount('#app')
