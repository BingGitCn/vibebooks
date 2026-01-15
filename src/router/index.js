import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Intro',
    component: () => import('../views/Intro.vue')
  },
  {
    path: '/universe',
    name: 'BooksUniverse',
    component: () => import('../views/BooksUniverse.vue')
  },
  {
    path: '/book/:id',
    name: 'BookImmersive',
    component: () => import('../views/BookImmersive.vue')
  },
  {
    path: '/world/prince',
    name: 'PrinceWorld',
    component: () => import('../worlds/PrinceWorld.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  }
})

export default router
