import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
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
    path: '/movement',
    name: 'Movement',
    component: () => import('../views/Movement.vue')
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
