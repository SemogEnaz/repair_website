import { createApp, createSSRApp } from 'vue'
import App from './App.vue'
import { createSiteRouter } from './router/index.js'

export function createSiteApp({ server = false, hydrate = false } = {}) {
	const app = server || hydrate ? createSSRApp(App) : createApp(App)
	const router = createSiteRouter(server)
	app.use(router)
	return { app, router }
}
