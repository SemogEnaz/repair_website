import { renderToString } from 'vue/server-renderer'
import { createSiteApp } from './app.js'

export async function render(url) {
	const { app, router } = createSiteApp({ server: true })
	await router.push(url)
	await router.isReady()
	const context = {}
	const html = await renderToString(app, context)
	return { html, modules: context.modules }
}
