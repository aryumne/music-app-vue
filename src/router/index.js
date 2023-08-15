import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
const routes = [
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
    path: '/manage',
    name: 'manage',
    component: () => import('../views/ManageView.vue')
  },
  {
    path: '/:catchAll(.*)*',
    redirect: { name: 'home' }
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkExactActiveClass: 'text-yellow-500'
})

export default router
