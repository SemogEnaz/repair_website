import './assets/main.css'

import { createSiteApp } from './app.js'
import { pageForPath, updateHead } from './utils/seo.js'
import { loadClarity } from './utils/clarity'

// A legacy SPA host may return the home document for a different URL. Do not
// hydrate that document against a different page (including the noindex 404).
const renderedPath = document.querySelector('#app')?.getAttribute('data-prerendered')
const { app, router } = createSiteApp({
	hydrate: renderedPath === pageForPath(location.pathname).path,
})
router.afterEach((to, _from, failure) => {
	if (!failure) updateHead(to.path)
})
router.isReady().then(async () => {
	updateHead(router.currentRoute.value.path)
	app.mount('#app')
	// Optional recording code should not delay initial rendering.
	if (await loadClarity()) {
		import('./utils/record_ip.js').then(({ recordIP }) => recordIP()).catch(() => {})
	}
})
