import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomePage },
    { path: '/about', name: 'about', component: () => import('@/views/AboutView.vue') },
    { path: '/buy', name: 'buy', component: () => import('@/views/BuyView.vue') },
    { path: '/battery', name: 'battery', component: () => import('@/views/WhyBatteryRepairView.vue') },
  ],
  scrollBehavior(to, from, savedPosition) {

	// Smooth scroll when clicking buttons that take a user somewhere within the page
    if (to.hash) return { el: to.hash, behavior: 'smooth' }

	// If the user switches to another router view (page) they continue where they left off
	if (savedPosition) return savedPosition;

	// Otherwise start at the top
	return { top: 0 }
  }
})

export default router
