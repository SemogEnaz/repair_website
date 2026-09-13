import { build } from 'vite'
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises'
import { pages, notFoundPage, renderHead, escapeHtml } from '../src/utils/seo.js'
import { business } from '../src/data/business.js'

await build({ build: { ssrManifest: true } })
await build({ build: { ssr: 'src/entry-server.js', outDir: 'dist-ssr', copyPublicDir: false } })
try {
	const { render } = await import('../dist-ssr/entry-server.js')
	const template = await readFile('dist/index.html', 'utf8')
	const manifest = JSON.parse(await readFile('dist/.vite/ssr-manifest.json', 'utf8'))
	if (!template.includes('<!--seo-head-->')) throw new Error('Missing SEO head placeholder')
	for (const page of [...pages, notFoundPage]) {
		const { html: content, modules } = await render(page.path)
		const styles = [...new Set([...modules].flatMap((id) => manifest[id] || []))]
			.filter((file) => file.endsWith('.css') && !template.includes(file))
			.map((file) => `<link rel="stylesheet" href="${file}">`)
			.join('\n')
		const html = template
			.replace('<!--seo-head-->', `${renderHead(page)}\n${styles}`)
			.replace(
				'<div id="app"></div>',
				`<div id="app" data-prerendered="${page.path}">${content}</div>`,
			)
		await writeFile(page.path === '/' ? 'dist/index.html' : `dist${page.path}.html`, html)
		if (page.path !== '/' && !page.noindex) {
			await mkdir(`dist${page.path}`, { recursive: true })
			await writeFile(`dist${page.path}/index.html`, html)
		}
	}
	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map((page) => `  <url><loc>${escapeHtml(business.url + page.path)}</loc></url>`).join('\n')}\n</urlset>\n`
	await writeFile('dist/sitemap.xml', sitemap)
	await writeFile(
		'dist/robots.txt',
		`User-agent: *\nAllow: /\n\nSitemap: ${business.url}/sitemap.xml\n`,
	)
	await rm('dist/.vite', { recursive: true, force: true })
	console.log(`Prerendered ${pages.length} indexable pages and a 404 page.`)
} finally {
	await rm('dist-ssr', { recursive: true, force: true })
}
