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
    path: '/vibe-universe',
    name: 'VibeBooksUniverse',
    component: () => import('../views/VibeBooksUniverse.vue')
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
  },
  {
    path: '/world/crime-and-punishment',
    name: 'CrimeAndPunishmentWorld',
    component: () => import('../worlds/CrimeAndPunishmentWorld.vue')
  },
  {
    path: '/world/sahara',
    name: 'SaharaWorld',
    component: () => import('../worlds/SaharaWorld.vue')
  },
  {
    path: '/world/killing-commendatore',
    name: 'KillingCommendatoreWorld',
    component: () => import('../worlds/KillingCommendatoreWorld.vue')
  },
  {
    path: '/world/lost-satellite',
    name: 'LostSatelliteWorld',
    component: () => import('../worlds/LostSatelliteWorld.vue')
  },
  {
    path: '/world/ergun-river',
    name: 'ErgunRiverWorld',
    component: () => import('../worlds/ErgunRiverWorld.vue')
  },
  {
    path: '/world/embodied',
    name: 'EmbodiedWorld',
    component: () => import('../worlds/EmbodiedWorld.vue')
  },
  {
    path: '/world/wencheng',
    name: 'WenchengWorld',
    component: () => import('../worlds/WenchengWorld.vue')
  },
  {
    path: '/world/norwegian-forest',
    name: 'NorwegianForestWorld',
    component: () => import('../worlds/NorwegianForestWorld.vue')
  },
  {
    path: '/world/uncertain-wall',
    name: 'UncertainWallWorld',
    component: () => import('../worlds/UncertainWallWorld.vue')
  },
  {
    path: '/world/q84',
    name: 'Q84World',
    component: () => import('../worlds/Q84World.vue')
  },
  {
    path: '/world/mountain-moon',
    name: 'MountainMoonWorld',
    component: () => import('../worlds/MountainMoonWorld.vue')
  },
  {
    path: '/world/shooting-hero',
    name: 'ShootingHeroWorld',
    component: () => import('../worlds/ShootingHeroWorld.vue')
  },
  {
    path: '/world/moon-and-sixpence',
    name: 'MoonAndSixpenceWorld',
    component: () => import('../worlds/MoonAndSixpenceWorld.vue')
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
