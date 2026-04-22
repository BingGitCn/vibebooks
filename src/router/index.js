import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'PsycheEntry',
    component: () => import('../views/PsycheEntry.vue')
  },
  {
    path: '/hall',
    name: 'PsycheIntro',
    component: () => import('../views/PsycheIntro.vue')
  },
  {
    path: '/school/:id',
    name: 'PsychologySchool',
    component: () => import('../views/PsychologySchool.vue')
  },
  {
    path: '/concept/:id',
    name: 'PsychologyConcept',
    component: () => import('../views/PsychologyConcept.vue')
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
    path: '/world/three-body',
    name: 'ThreeBodyWorld',
    component: () => import('../worlds/ThreeBodyWorld.vue')
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
    // 如果有保存的位置（浏览器后退/前进），使用保存的位置
    if (savedPosition) {
      return savedPosition
    }

    // 进入思维实验或概念页面，滚动到顶部
    if (to.path.startsWith('/experiment/') || to.path.startsWith('/concept/')) {
      return { top: 0, behavior: 'smooth' }
    }

    // 如果是进入书籍世界页面（/world/*），始终滚动到顶部
    if (to.path.startsWith('/world/')) {
      return { top: 0, behavior: 'smooth' }
    }

    // 如果是从书籍页面返回到章节页，不滚动，保持当前位置
    if (from.path.startsWith('/world/') && to.path.startsWith('/yearbook/')) {
      return false
    }

    // 其他情况，滚动到顶部
    return { top: 0, behavior: 'smooth' }
  }
})

export default router
