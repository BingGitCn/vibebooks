import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Intro',
    component: () => import('../views/Intro.vue')
  },
  {
    path: '/yearbook',
    name: 'YearbookCover',
    component: () => import('../views/YearbookCover.vue')
  },
  {
    path: '/yearbook/:category',
    name: 'YearbookChapter',
    component: () => import('../views/YearbookChapter.vue')
  },
  {
    path: '/world/island-bookstore',
    name: 'IslandBookstoreWorld',
    component: () => import('../worlds/IslandBookstoreWorld.vue')
  },
  {
    path: '/world/moscow-gentleman',
    name: 'MoscowGentlemanWorld',
    component: () => import('../worlds/MoscowGentlemanWorld.vue')
  },
  {
    path: '/book/:id',
    name: 'BookImmersive',
    component: () => import('../views/BookImmersive.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  }
})

export default router
