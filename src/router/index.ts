import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Movement',
    component: () => import('../views/Movement.vue')
  },
  {
    path: '/brand',
    name: 'Brand',
    component: () => import('../views/BrandForm.vue')
  },
  {
    path: '/conductor',
    name: 'Conductor',
    component: () => import('../views/Conductor.vue')
  },
  {
    path: '/model',
    name: 'Model',
    component: () => import('../views/Model.vue')
  },
  {
    path: '/vehicle',
    name: 'Vehicle',
    component: () => import('../views/Vehicle.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../views/Settings.vue')
  },
  {
    path: '/*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
