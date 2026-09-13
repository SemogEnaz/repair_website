import { createRouter, createWebHistory, createMemoryHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import { services } from '@/data/services.js'

export function createSiteRouter(server = false) {
	return createRouter({
		history: server
			? createMemoryHistory(import.meta.env.BASE_URL)
			: createWebHistory(import.meta.env.BASE_URL),
		routes: [
			{ path: '/', name: 'home', component: HomePage },
			{ path: '/about', name: 'about', component: () => import('@/views/AboutView.vue') },
			{ path: '/buy', name: 'buy', component: () => import('@/views/BuyView.vue') },
			{
				path: '/battery',
				name: 'battery',
				component: () => import('@/views/Blogs/BatteryRepair.vue'),
			},
			{
				path: '/contact',
				name: 'contact',
				component: () => import('@/views/ContactView.vue'),
			},
			{
				path: '/repair-prices',
				name: 'prices',
				component: () => import('@/views/PricesView.vue'),
			},
			{ path: '/calculator', redirect: '/repair-prices' },
			...services.map((service) => ({
				path: service.path,
				component: () => import('@/views/ServiceView.vue'),
				props: { service },
			})),
			{
				path: '/:pathMatch(.*)*',
				name: 'not-found',
				component: () => import('@/views/NotFoundView.vue'),
			},
		],
		scrollBehavior(to, from, savedPosition) {
			// Smooth scroll when clicking buttons that take a user somewhere within the page
			if (to.hash) return { el: to.hash, behavior: 'smooth' }

			// If the user switches to another router view (page) they continue where they left off
			if (savedPosition) return savedPosition

			// Otherwise start at the top
			return { top: 0 }
		},
	})
}
