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
    path: '/world/night-submarine',
    name: 'NightSubmarineWorld',
    component: () => import('../worlds/NightSubmarineWorld.vue')
  },
  {
    path: '/world/norwegian-wood',
    name: 'NorwegianWoodWorld',
    component: () => import('../worlds/NorwegianWoodWorld.vue')
  },
  {
    path: '/world/marcovaldo',
    name: 'MarcovaldoWorld',
    component: () => import('../worlds/MarcovaldoWorld.vue')
  },
  {
    path: '/world/killing-commendatore',
    name: 'KillingCommendatoreWorld',
    component: () => import('../worlds/KillingCommendatore.vue')
  },
  {
    path: '/world/erguna-river',
    name: 'ErgunaRiverWorld',
    component: () => import('../worlds/ErgunaRiverWorld.vue')
  },
  {
    path: '/world/wencheng',
    name: 'WenchengWorld',
    component: () => import('../worlds/WenchengWorld.vue')
  },
  {
    path: '/world/namiya-zakaten',
    name: 'NamiyaZakatenWorld',
    component: () => import('../worlds/NamiyaZakatenWorld.vue')
  },
  {
    path: '/world/camellia-shop',
    name: 'CamelliaShopWorld',
    component: () => import('../worlds/CamelliaShopWorld.vue')
  },
  {
    path: '/world/litchi-road',
    name: 'LitchiRoadWorld',
    component: () => import('../worlds/LitchiRoadWorld.vue')
  },
  {
    path: '/world/life-sea',
    name: 'LifeSeaWorld',
    component: () => import('../worlds/LifeSeaWorld.vue')
  },
  {
    path: '/world/uncertain-wall',
    name: 'UncertainWallWorld',
    component: () => import('../worlds/UncertainWallWorld.vue')
  },
  {
    path: '/world/moon-sixpence',
    name: 'MoonAndSixpenceWorld',
    component: () => import('../worlds/MoonAndSixpenceWorld.vue')
  },
  {
    path: '/world/bright-night',
    name: 'BrightNightWorld',
    component: () => import('../worlds/BrightNightWorld.vue')
  },
  {
    path: '/world/veiled',
    name: 'VeiledWorld',
    component: () => import('../worlds/VeiledWorld.vue')
  },
  {
    path: '/world/grass-roots',
    name: 'GrassRootsWorld',
    component: () => import('../worlds/GrassRootsWorld.vue')
  },
  {
    path: '/world/little-prince',
    name: 'LittlePrinceWorld',
    component: () => import('../worlds/LittlePrinceWorld.vue')
  },
  {
    path: '/world/one-hundred-years',
    name: 'OneHundredYearsWorld',
    component: () => import('../worlds/OneHundredYearsWorld.vue')
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
