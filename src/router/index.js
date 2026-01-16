import { createRouter, createWebHashHistory } from 'vue-router'

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
  },
  {
    path: '/world/island-bookstore',
    name: 'IslandBookstoreWorld',
    component: () => import('../worlds/IslandBookstoreWorld.vue')
  },
  {
    path: '/world/trapped-in-dunes',
    name: 'TrappedInDunesWorld',
    component: () => import('../worlds/TrappedInDunes.vue')
  },
  {
    path: '/world/night-submarine',
    name: 'NightSubmarineWorld',
    component: () => import('../worlds/NightSubmarine.vue')
  },
  {
    path: '/world/moscow-gentleman',
    name: 'MoscowGentlemanWorld',
    component: () => import('../worlds/MoscowGentlemanWorld.vue')
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
