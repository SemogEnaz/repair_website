import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomePage },
    { path: '/about', name: 'about', component: () => import('@/views/AboutView.vue') },
    { path: '/buyback', name: 'buyback', component: () => import('@/views/BuybackView.vue') },
    { path: '/outcall', name: 'outcall', component: () => import('@/views/OutcallView.vue') },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
  }
})

export default router
